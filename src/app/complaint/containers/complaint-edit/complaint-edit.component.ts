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
  admCounterInfo = {
    start: 0,
    end: 0,
  };
  admInfo = {
    start: `ROX-DF-${this.admCounterInfo.start.toString().padStart(2, '0')}`,
    end: `ROX-DF-${this.admCounterInfo.end.toString().padStart(2, '0')}`,
  };

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  violations: ViolationsType[] = [...violations];

  alert = {
    type: '',
    description: '',
  };
  disableDuringProcess = false;

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

    this.complaintService.createNewComplaintListener.subscribe({
      next: (val) => {
        this.initForm();
        const descriptions = val.docketNumberDescription.trim().replace(' ', '').replace(' ', '').split('to');
        val.transmitters.forEach(() => {
          this.addTransmitterInput();
        });
        this.form.patchValue({
          ...val,
          complainantName: 'National Telecommunication Commission',
          docketNumberDescription: this.descriptionGenerator(descriptions),
        });
        this.clientName = val.clientName;
        console.log({ val, form: this.form.value });
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

  descriptionGenerator(descriptions: string[]): string {
    if (descriptions.length === 1) {
      return `ADM Case No. ${descriptions[0]}`;
    }
    return `ADM Case No. ${descriptions[0]} to ADM Case No. ${descriptions[1]}`;
  }

  setADMCounter() {
    const resCounterInfo = +this.systemService.getFormCounterInfo().find((val) => val.setting === 'rox_counter').value;
    this.admCounterInfo = {
      start: resCounterInfo,
      end: resCounterInfo,
    };
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

  removeTransmitterInput(index: number) {
    this.transmitters.removeAt(index);
  }

  submit(): void {
    try {
      console.log(this.form.value);
      if (!this.form.valid) {
        this.alert.type = 'warning';
        this.alert.description = 'Fill up required!';
        return;
      }
      this.alert.type = 'info';
      this.alert.description = 'Saving data...';
      this.disableDuringProcess = true;
      if (this.formMode === ADD) {
        this.complaintService
          .addOne(this.form.value)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: (res) => {
              this.alert.type = 'success';
              this.alert.description = 'Complaint saved!';
              this.disableDuringProcess = false;
            },
            error: (error) => {
              throw error;
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
            error: (error) => {
              throw error;
            },
          });
      }
    } catch (error) {
      this.alert.type = 'danger';
      this.alert.description = 'Complaint not saved! Unknown error.';
      this.disableDuringProcess = false;
    }
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }
}
