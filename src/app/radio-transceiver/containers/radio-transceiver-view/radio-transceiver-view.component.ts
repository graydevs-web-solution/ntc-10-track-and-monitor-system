import { UserTypes } from './../../../shared/constants';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt, faFilePdf, faCheck, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { operatorInput, radioTransceiverEntryInput, initForm, receiverOrOtherEquipmentInput } from '../../radio-transceiver-shared';
import { VIEW } from 'src/app/shared/constants';
import { isArrayValue } from 'src/app/shared/utility';
import { RadioTransceiver } from '../../models/radio-transceiver.model';
import { Approval } from 'src/app/shared/models/approvalStatus';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-radio-transceiver-view',
  templateUrl: './radio-transceiver-view.component.html',
  styleUrls: ['./radio-transceiver-view.component.css'],
})
export class RadioTransceiverViewComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;
  clientName = '';
  responseData: RadioTransceiver;

  getDestroyed = new Subject();

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

  constructor(private radioTransceiverService: RadioTransceiverService, private route: ActivatedRoute, private authService: AuthService) {}

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

    this.radioTransceiverService.getEntriesListener().subscribe({
      next: () => {
        const fetchedValueInner = this.radioTransceiverService.getSelectedEntry(this.formId);
        this.responseData = fetchedValueInner;
        for (const _ of isArrayValue(fetchedValue.operators)) {
          this.addOperatorInput();
        }
        for (const _ of isArrayValue(fetchedValue.radioTransceivers)) {
          this.addRadioTransceiverInput();
        }
        for (const _ of isArrayValue(fetchedValue.receivers)) {
          this.addReceiver();
        }
        for (const _ of isArrayValue(fetchedValue.otherEquipments)) {
          this.addOtherEquipment();
        }
        this.clientName = fetchedValue.clientName;
        this.form.patchValue({
          ...fetchedValue,
          notedBy: fetchedValue.notedByInfo.name,
          regionalDirector: fetchedValue.regionalDirectorInfo.name,
        });
        this.isApprovedDirector = this.responseData.regionalDirectorApproved;
        this.isApprovedChief = this.responseData.notedByApproved;
      },
    });

    const fetchedValue = this.radioTransceiverService.getSelectedEntry(this.formId);
    this.responseData = fetchedValue;
    for (const _ of isArrayValue(fetchedValue.operators)) {
      this.addOperatorInput();
    }
    for (const _ of isArrayValue(fetchedValue.radioTransceivers)) {
      this.addRadioTransceiverInput();
    }
    for (const _ of isArrayValue(fetchedValue.receivers)) {
      this.addReceiver();
    }
    for (const _ of isArrayValue(fetchedValue.otherEquipments)) {
      this.addOtherEquipment();
    }
    this.clientName = fetchedValue.clientName;
    this.form.patchValue({
      ...fetchedValue,
      notedBy: fetchedValue.notedByInfo.name,
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    });
    this.isApprovedDirector = this.responseData.regionalDirectorApproved;
    this.isApprovedChief = this.responseData.notedByApproved;
    console.log('approve director', this.isApprovedDirector);

    this.radioTransceiverService.resourceType.next(VIEW);
  }

  ngOnDestroy(): void {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm(): void {
    this.form = initForm(true);
  }

  addOperatorInput(): void {
    this.operators.push(operatorInput());
  }

  addRadioTransceiverInput(): void {
    this.radioTransceivers.push(radioTransceiverEntryInput());
  }

  addReceiver() {
    this.receivers.push(receiverOrOtherEquipmentInput());
  }

  addOtherEquipment() {
    this.otherEquipments.push(receiverOrOtherEquipmentInput());
  }

  generatePdf(): void {
    this.radioTransceiverService.generatePdf(this.formId);
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
        radioTransceiver: this.responseData,
      };
      const response = await this.radioTransceiverService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.radioTransceiverService.getEntriesAPI();
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
        radioTransceiver: this.responseData,
      };
      const response = await this.radioTransceiverService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.radioTransceiverService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  get operators() {
    return this.form.get('operators') as FormArray;
  }

  get radioTransceivers() {
    return this.form.get('radioTransceivers') as FormArray;
  }

  get receivers() {
    return this.form.get('receivers') as FormArray;
  }

  get otherEquipments() {
    return this.form.get('otherEquipments') as FormArray;
  }
}
