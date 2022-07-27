import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { VIEW } from 'src/app/shared/constants';
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

  isApprovedDirector = null;
  isApprovedChief = null;
  isDirector = this.authService.isApprover();
  isChief = this.authService.isChief();
  isITAdmin = this.authService.isITAdmin();

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
    const fetchedValue = this.radioDealerService.getSelectedEntry(this.formId);
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
    this.radioDealerService.resourceType.next(VIEW);
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

  get supervisingECE(): FormArray {
    return this.form.get('supervisingECE') as FormArray;
  }

  get radioTechnicians(): FormArray {
    return this.form.get('radioTechnicians') as FormArray;
  }
}
