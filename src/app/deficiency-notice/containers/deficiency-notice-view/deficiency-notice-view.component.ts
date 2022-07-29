import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ComplaintService } from 'src/app/complaint/complaint.service';
import { Complaint } from 'src/app/complaint/models/complaint.model';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { VIEW } from 'src/app/shared/constants';
import { Approval } from 'src/app/shared/models/approvalStatus';
import { formatDate } from 'src/app/shared/utility';
import { initForm, transmitterInput, violations } from '../../deficiency-notice-shared';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';
import { ViolationsType } from '../../models/violations.model';

@Component({
  selector: 'app-deficiency-notice-view',
  templateUrl: './deficiency-notice-view.component.html',
  styleUrls: ['./deficiency-notice-view.component.css'],
})
export class DeficiencyNoticeViewComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = VIEW;
  clientName = '';
  respondentName = '';

  faCalendarAlt = faCalendarAlt;
  faFilePdf = faFilePdf;
  deficiencyNotice: DeficiencyNotice;
  responseData: DeficiencyNotice;

  getDestroyed = new Subject();

  violations: ViolationsType[] = [...violations];

  constructor(
    private dnService: DeficiencyNoticeService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private modalService: NgbModal,
    private router: Router,
    private complaintService: ComplaintService,
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
    this.deficiencyNotice = this.dnService.getSelectedEntry(this.formId);
    const fetchedValue = this.deficiencyNotice;
    for (const _ of fetchedValue.transmitters) {
      this.addTransmitterInput();
    }
    this.clientName = fetchedValue.clientName;
    this.respondentName = fetchedValue.respondentName;
    const vals: DeficiencyNotice = {
      ...fetchedValue,
      date: formatDate(fetchedValue.date, false),
      dateOfDeficiencyHearing: formatDate(fetchedValue.dateOfDeficiencyHearing, false),
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    };
    this.form.patchValue(vals);
    this.dnService.resourceType.next(VIEW);
  }

  initForm(): void {
    this.form = initForm();
  }

  addTransmitterInput() {
    this.transmitters.push(transmitterInput());
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }

  isDoneString(): string {
    return !!(this.form.get('isDone').value as boolean) ? 'Yes' : 'No';
  }

  generatePdf(): void {
    this.dnService.generatePdf(this.formId);
  }

  async approve() {
    try {
      const approveData: Approval = {
        approvalStatus: 'approve',
        userID: this.authService.getUserInfo().user_id,
        position: this.authService.getUserInfo().position,
        deficiencyNotice: this.responseData,
      };
      const response = await this.dnService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.dnService.getEntriesAPI();
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
        deficiencyNotice: this.responseData,
      };
      const response = await this.dnService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.dnService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  async createNewComplaint() {
    await this.router.navigate(['complaint', 'new']);
    this.complaintService.createNewComplaintListener.next(this.deficiencyNotice);
  }
}
