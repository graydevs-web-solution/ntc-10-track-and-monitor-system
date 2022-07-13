import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { initForm, transmitterInput, violations } from '../../deficiency-notice-shared';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';
import { ViolationsType } from '../../models/violations.model';

@Component({
  selector: 'app-deficiency-notice-edit',
  templateUrl: './deficiency-notice-edit.component.html',
  styleUrls: ['./deficiency-notice-edit.component.css'],
})
export class DeficiencyNoticeEditComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';
  regDirectorInfo = {
    ['user_id']: '',
    name: '',
  };
  roxCounterInfo = {
    start: 0,
    end: 0,
  };
  roxInfo = {
    start: `ROX-DF-${this.roxCounterInfo.start.toString().padStart(2, '0')}`,
    end: `ROX-DF-${this.roxCounterInfo.end.toString().padStart(2, '0')}`,
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
    private dnService: DeficiencyNoticeService,
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
      const fetchedValue = this.dnService.getSelectedEntry(this.formId);
      fetchedValue.transmitters.forEach(() => {
        this.addTransmitterInput();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({ ...fetchedValue });
      this.dnService.resourceType.next(EDIT);
    } else {
      this.setROXCounter();
      this.generateDocketNumber();
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id });
      this.dnService.resourceType.next(ADD);
    }
  }

  setROXCounter() {
    const resCounterInfo = +this.systemService.getFormCounterInfo().find((val) => val.setting === 'rox_counter').value;
    this.roxCounterInfo = {
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
    if (this.transmitters.length >= 2) {
      this.roxCounterInfo.end += 1;
    }
    this.generateDocketNumber();
  }

  removeTransmitterInput(index: number) {
    this.transmitters.removeAt(index);
    if (this.roxCounterInfo.end !== this.roxCounterInfo.start) {
      this.roxCounterInfo.end -= 1;
    }
    this.generateDocketNumber();
  }

  submit(): void {
    try {
      if (!this.form.valid) {
        this.alert.type = 'warning';
        this.alert.description = 'Fill up required data!';
        return;
      }
      this.alert.type = 'info';
      this.alert.description = 'Saving data!';
      this.disableDuringProcess = true;
      if (this.formMode === ADD) {
        const data: DeficiencyNotice = this.form.value;
        data.docketNumberStart = this.roxCounterInfo.start;
        data.docketNumberEnd = this.roxCounterInfo.end;
        this.dnService
          .addOne(data)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: (res) => {
              this.alert.type = 'success';
              this.alert.description = 'Deficiency Notice saved!';
              this.disableDuringProcess = false;
              this.systemService.setFormCounterManual(res.data.setting);
              this.setROXCounter();
              this.form.reset();
            },
            error: (error) => {
              throw error;
            },
          });
      } else {
        this.dnService
          .updateOne(this.formId, this.form.value)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: (res) => {
              this.alert.type = 'success';
              this.alert.description = 'Deficiency Notice saved!';
              this.disableDuringProcess = false;
            },
            error: (error) => {
              throw error;
            },
          });
      }
    } catch (error) {
      this.alert.type = 'danger';
      this.alert.description = 'Deficiency Notice not saved! Unknown error';
      this.disableDuringProcess = false;
    }
  }

  generateDocketNumber(): void {
    let docketNumber = '';
    const currentDate = new Date().getFullYear();
    this.roxInfo = {
      start: `ROX-DF-${this.roxCounterInfo.start.toString().padStart(3, '0')}-${currentDate}`,
      end: `ROX-DF-${this.roxCounterInfo.end.toString().padStart(3, '0')}-${currentDate}`,
    };
    if (this.roxInfo.start === this.roxInfo.end || this.transmitters.length <= 1) {
      docketNumber = this.roxInfo.start;
    } else {
      docketNumber = `${this.roxInfo.start} to ${this.roxInfo.end}`;
    }
    this.docketNumberStart.setValue(this.roxCounterInfo.start);
    this.docketNumberEnd.setValue(this.roxCounterInfo.end);
    this.docketNumberDescription.setValue(docketNumber);
  }

  get docketNumberStart() {
    return this.form.get('docketNumberStart');
  }

  get docketNumberEnd() {
    return this.form.get('docketNumberEnd');
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }

  get docketNumberDescription() {
    return this.form.get('docketNumberDescription');
  }
}
