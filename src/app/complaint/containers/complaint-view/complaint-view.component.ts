import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { time } from 'console';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ViolationsType } from 'src/app/deficiency-notice/models/violations.model';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, VIEW } from 'src/app/shared/constants';
import { Approval } from 'src/app/shared/models/approvalStatus';
import { formatDate } from 'src/app/shared/utility';
import { initForm, transmitterInput, violations } from '../../complaint-shared';
import { ComplaintService } from '../../complaint.service';
import { Complaint, TimeInfo } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.css'],
})
export class ComplaintViewComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';
  meridian = true;
  responseData: Complaint;

  faCalendarAlt = faCalendarAlt;
  faFilePdf = faFilePdf;

  getDestroyed = new Subject();

  violations: ViolationsType[] = [...violations];

  constructor(
    private complaintService: ComplaintService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private modalService: NgbModal,
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
    const fetchedValue = this.complaintService.getSelectedEntry(this.formId);
    for (const _ of fetchedValue.transmitters || []) {
      this.addTransmitterInput();
    }
    this.clientName = fetchedValue.clientName;
    const vals: Complaint = {
      ...fetchedValue,
      date: formatDate(fetchedValue.date, false),
      dateOfInspection: formatDate(fetchedValue.dateOfInspection, false),
      dateOfHearing: formatDate(fetchedValue.dateOfHearing, false),
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    };
    this.form.patchValue(vals);
    this.complaintService.resourceType.next(VIEW);
  }

  initForm(): void {
    this.form = initForm();
  }

  addTransmitterInput() {
    this.transmitters.push(transmitterInput(true));
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.complaintService
        .addOne(this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (res) => {
            console.log('OK');
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.complaintService
        .updateOne(this.formId, this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (res) => {
            console.log('OK');
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  generatePdf(): void {
    this.complaintService.generatePdf(this.formId);
  }

  isDoneString(): string {
    return !!(this.form.get('isDone').value as boolean) ? 'Yes' : 'No';
  }

  timeOfHearing() {
    const timeObj = this.form.get('timeOfHearing').value as TimeInfo;
    const minute = timeObj.minute;
    let hour = timeObj.hour;
    let meridian = 'AM';
    if (timeObj.hour > 12) {
      hour = timeObj.hour - 12;
      meridian = 'PM';
    }
    return `${hour}:${minute.toString().padEnd(2, '0')} ${meridian}`;
  }

  async approve() {
    try {
      const approveData: Approval = {
        approvalStatus: 'approve',
        userID: this.authService.getUserInfo().user_id,
        position: this.authService.getUserInfo().position,
        complaint: this.responseData,
      };
      const response = await this.complaintService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.complaintService.getEntriesAPI();
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
        complaint: this.responseData,
      };
      const response = await this.complaintService.setApprovalStatus(approveData).toPromise();
      console.log({ response });
      this.complaintService.getEntriesAPI();
    } catch (error) {
      console.log(error);
    }
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }
}
