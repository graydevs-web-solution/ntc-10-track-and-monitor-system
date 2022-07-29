import { ServiceCenterReportService } from './../../service-center-report.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { employedETInput, initForm, serviceOrTestEquipmentInput } from '../../service-center-shared';
import { VIEW } from 'src/app/shared/constants';
import { AuthService } from 'src/app/auth/auth.service';
import { ServiceCenterReport } from '../../models/service-center-report.model';
import { Approval } from 'src/app/shared/models/approvalStatus';

@Component({
  selector: 'app-service-center-report-view',
  templateUrl: './service-center-report-view.component.html',
  styleUrls: ['./service-center-report-view.component.css'],
})
export class ServiceCenterReportViewComponent implements OnInit {
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
  responseData: ServiceCenterReport;

  getDestroyed = new Subject();

  constructor(
    private serviceCenterReportService: ServiceCenterReportService,
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
    const fetchedValue = this.serviceCenterReportService.getSelectedEntry(this.formId);
    fetchedValue.listOfServiceOrTestEquipments.forEach(() => {
      this.addServiceOrTestEquipment();
    });
    fetchedValue.employedElectronicsTechnicians.forEach(() => {
      this.addEmployedElectronicTechnician();
    });
    this.clientName = fetchedValue.clientName;
    this.form.patchValue({
      ...fetchedValue,
      notedBy: fetchedValue.notedByInfo.name,
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    });
    this.isApprovedDirector = fetchedValue.regionalDirectorApproved;
    this.isApprovedChief = fetchedValue.notedByApproved;

    this.serviceCenterReportService.resourceType.next(VIEW);
  }

  initForm(): void {
    this.form = initForm();
  }

  submit(): void {
    this.serviceCenterReportService.addOne(this.form.value);
  }

  addServiceOrTestEquipment(): void {
    this.listOfServiceOrTestEquipments.push(serviceOrTestEquipmentInput());
  }

  addEmployedElectronicTechnician() {
    this.employedElectronicsTechnicians.push(employedETInput());
  }

  generatePdf(): void {
    this.serviceCenterReportService.generatePdf(this.formId);
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
        serviceCenter: this.responseData,
      };
      const response = await this.serviceCenterReportService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.serviceCenterReportService.getEntriesAPI();
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
        serviceCenter: this.responseData,
      };
      const response = await this.serviceCenterReportService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.serviceCenterReportService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  get listOfServiceOrTestEquipments(): FormArray {
    return this.form.get('listOfServiceOrTestEquipments') as FormArray;
  }

  get employedElectronicsTechnicians(): FormArray {
    return this.form.get('employedElectronicsTechnicians') as FormArray;
  }
}
