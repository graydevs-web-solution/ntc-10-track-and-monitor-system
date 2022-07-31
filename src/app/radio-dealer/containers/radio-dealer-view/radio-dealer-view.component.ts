import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt, faCheck, faCheckCircle, faFilePdf, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { VIEW } from 'src/app/shared/constants';
import { Approval } from 'src/app/shared/models/approvalStatus';
import { RadioDealer } from '../../models/radio-dealer.model';
import { initForm, supervisingECEInput, techniciansInput } from '../../radio-dealer-shared';
import { RadioDealerService } from '../../radio-dealer.service';

@Component({
  selector: 'app-radio-dealer-view',
  templateUrl: './radio-dealer-view.component.html',
  styleUrls: ['./radio-dealer-view.component.css'],
})
export class RadioDealerViewComponent implements OnInit {
  form: FormGroup;
  formId: string;
  clientName = '';

  faCalendarAlt = faCalendarAlt;
  faFilePdf = faFilePdf;
  faCheck = faCheck;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;

  isApprovedDirector = null;
  isApprovedChief = null;
  isDirector = this.authService.isApprover();
  isChief = this.authService.isChief();
  isITAdmin = this.authService.isITAdmin();
  responseData: RadioDealer;

  getDestroyed = new Subject();

  constructor(private radioDealerService: RadioDealerService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        takeUntil(this.getDestroyed)
      )
      .subscribe({
        next: (value) => {
          this.formId = value;
        },
      });

    this.radioDealerService.getEntriesListener().subscribe({
      next: () => {
        console.log('triggered');
        this.setData();
      },
    });
    this.setData();

    this.radioDealerService.resourceType.next(VIEW);
  }

  setData() {
    const fetchedValue = this.radioDealerService.getSelectedEntry(this.formId);
    this.responseData = fetchedValue;
    fetchedValue.supervisingECE.forEach(() => {
      this.addSupervisingECE();
    });
    fetchedValue.radioTechnicians.forEach(() => {
      this.addTechnicians();
    });
    this.clientName = fetchedValue.clientName;
    this.form.patchValue({
      ...fetchedValue,
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    });
    this.isApprovedDirector = fetchedValue.regionalDirectorApproved;
  }

  initForm(): void {
    this.form = initForm(true);
  }

  addSupervisingECE(): void {
    this.supervisingECE.push(supervisingECEInput());
  }

  addTechnicians() {
    this.radioTechnicians.push(techniciansInput());
  }

  generatePdf(): void {
    this.radioDealerService.generatePdf(this.formId);
  }

  showDocumentApprovalStatusDirector() {
    return this.isDirector || this.isITAdmin;
  }

  showApproveDisapproveDirector() {
    return this.isDirector && (this.isApprovedDirector === '' || this.isApprovedDirector === null);
  }

  showApprovalStatusDirector() {
    if (this.isApprovedDirector === '') return false;
    return this.isApprovedDirector;
  }

  showPendingStatusDirector() {
    if (this.isDirector || this.isApprovedDirector) return false;
    return true;
  }

  async approve() {
    try {
      const approveData: Approval = {
        approvalStatus: 'approve',
        userID: this.authService.getUserInfo().user_id,
        position: this.authService.getUserInfo().position,
        radioDealer: this.responseData,
      };
      console.log(approveData);
      const response = await this.radioDealerService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.radioDealerService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  async disapprove() {
    try {
      const approveData: Approval = {
        approvalStatus: 'disapprove',
        userID: this.authService.getUserInfo().user_id,
        position: this.authService.getUserInfo().position,
        radioDealer: this.responseData,
      };
      const response = await this.radioDealerService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.radioDealerService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  get supervisingECE(): FormArray {
    return this.form.get('supervisingECE') as FormArray;
  }

  get radioTechnicians(): FormArray {
    return this.form.get('radioTechnicians') as FormArray;
  }
}
