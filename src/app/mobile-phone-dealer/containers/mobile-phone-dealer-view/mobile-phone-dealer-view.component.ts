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
import { initForm, stockMobilePhoneInput, stockSIMInput, stockSpareAndAccessoryInput } from '../../mobile-phone-dealer-shared';
import { MobilePhoneDealerService } from '../../mobile-phone-dealer.service';
import { MobilePhoneDealer } from '../../models/mobile-phone-dealer.model';

@Component({
  selector: 'app-mobile-phone-dealer-view',
  templateUrl: './mobile-phone-dealer-view.component.html',
  styleUrls: ['./mobile-phone-dealer-view.component.css'],
})
export class MobilePhoneDealerViewComponent implements OnInit {
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
  responseData: MobilePhoneDealer;

  getDestroyed = new Subject();

  constructor(
    private mobilePhoneDealerService: MobilePhoneDealerService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

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

    this.mobilePhoneDealerService.getEntriesListener().subscribe({
      next: () => {
        this.setData();
      },
    });
    this.setData();

    this.mobilePhoneDealerService.resourceType.next(VIEW);
  }

  setData() {
    const fetchedValue = this.mobilePhoneDealerService.getSelectedEntry(this.formId);
    fetchedValue.listOfStocksOfSparesAndAccessories.forEach(() => {
      this.addStockSpareAndAccessory();
    });
    fetchedValue.listOfStocksOfMobilePhone.forEach(() => {
      this.addStockMobilePhone();
    });
    fetchedValue.listOfStocksOfSubscriberIdentificationModule.forEach(() => {
      this.addStockSIM();
    });
    this.clientName = fetchedValue.clientName;
    this.responseData = fetchedValue;
    this.form.patchValue({
      ...fetchedValue,
      notedBy: fetchedValue.notedByInfo.name,
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    });
    this.isApprovedDirector = fetchedValue.regionalDirectorApproved;
    this.isApprovedChief = fetchedValue.notedByApproved;
  }

  initForm(): void {
    this.form = initForm(true);
  }

  addStockSpareAndAccessory(): void {
    this.listOfStocksOfSparesAndAccessories.push(stockSpareAndAccessoryInput(true));
  }

  addStockMobilePhone() {
    this.listOfStocksOfMobilePhone.push(stockMobilePhoneInput(true));
  }

  addStockSIM() {
    this.listOfStocksOfSubscriberIdentificationModule.push(stockSIMInput(true));
  }

  generatePdf(): void {
    this.mobilePhoneDealerService.generatePdf(this.formId);
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

  showDocumentApprovalStatusChief() {
    return this.isChief || this.isITAdmin;
  }

  showApproveDisapproveChief() {
    return this.isChief && (this.isApprovedChief === '' || this.isApprovedChief === null);
  }

  showApprovalStatusChief() {
    if (this.isApprovedChief === '') return false;
    return this.isApprovedChief;
  }

  showPendingStatusChief() {
    if (this.isChief || this.isApprovedChief) return false;
    return true;
  }

  async approve() {
    try {
      const approveData: Approval = {
        approvalStatus: 'approve',
        userID: this.authService.getUserInfo().user_id,
        position: this.authService.getUserInfo().position,
        mobilePhoneDealer: this.responseData,
      };
      const response = await this.mobilePhoneDealerService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.mobilePhoneDealerService.getEntriesAPI();
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
        mobilePhoneDealer: this.responseData,
      };
      const response = await this.mobilePhoneDealerService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.mobilePhoneDealerService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  get approveStatus(): string {
    const approved = this.form.get('isApproved').value;

    if (approved === null) {
      return `Undecided`;
    }

    if (approved) {
      return `Approved`;
    } else {
      return `Disapproved`;
    }
  }

  get listOfStocksOfSparesAndAccessories(): FormArray {
    return this.form.get('listOfStocksOfSparesAndAccessories') as FormArray;
  }

  get listOfStocksOfMobilePhone(): FormArray {
    return this.form.get('listOfStocksOfMobilePhone') as FormArray;
  }

  get listOfStocksOfSubscriberIdentificationModule(): FormArray {
    return this.form.get('listOfStocksOfSubscriberIdentificationModule') as FormArray;
  }
}
