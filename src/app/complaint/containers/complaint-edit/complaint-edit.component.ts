import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ViolationsType } from 'src/app/deficiency-notice/models/violations.model';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { initForm, transmitterInput, violations } from '../../complaint-shared';
import { ComplaintService } from '../../complaint.service';

@Component({
  selector: 'app-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['./complaint-edit.component.css'],
})
export class ComplaintEditComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';
  meridian = true;
  regDirectorInfo = {
    ['user_id']: '',
    name: '',
  };

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  violations: ViolationsType[] = [...violations];

  constructor(
    private complaintService: ComplaintService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private modalService: NgbModal,
    private systemService: SystemSettingService
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
          this.formMode = value ? EDIT : ADD;
        },
      });

    this.clientService.selectedEntry.pipe(takeUntil(this.getDestroyed)).subscribe({
      next: (response) => {
        this.form.patchValue({ clientId: response.id, respondentName: response.ownerName });
        this.clientName = response.businessName;
      },
    });

    if (this.formMode === EDIT) {
      const fetchedValue = this.complaintService.getSelectedEntry(this.formId);
      fetchedValue.transmitters.forEach(() => {
        this.addTransmitterInput();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({ ...fetchedValue });
      this.complaintService.resourceType.next(EDIT);
    } else {
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id });
      this.complaintService.resourceType.next(ADD);
    }
  }

  initForm(): void {
    this.form = initForm();
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  addTransmitterInput() {
    this.transmitters.push(transmitterInput());
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

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }
}
