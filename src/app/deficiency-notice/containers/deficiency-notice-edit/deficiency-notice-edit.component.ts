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
      const resCounterInfo = +this.systemService.getFormCounterInfo().find((val) => val.setting === 'rox_counter').value;
      this.roxCounterInfo = {
        start: resCounterInfo,
        end: resCounterInfo,
      };
      this.generateDocketNumber();
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id });
      this.dnService.resourceType.next(ADD);
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
    this.roxCounterInfo.end += 1;
    this.generateDocketNumber();
    this.transmitters.push(transmitterInput());
  }

  removeTransmitterInput(index: number) {
    this.roxCounterInfo.end -= 1;
    this.generateDocketNumber();
    this.transmitters.removeAt(index);
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.dnService
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
      this.dnService
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

  generateDocketNumber(): void {
    let docketNumber = '';
    const currentDate = new Date().getFullYear();
    this.roxInfo = {
      start: `ROX-DF-${this.roxCounterInfo.start.toString().padStart(3, '0')}-${currentDate}`,
      end: `ROX-DF-${this.roxCounterInfo.end.toString().padStart(3, '0')}-${currentDate}`,
    };
    if (this.roxInfo.start === this.roxInfo.end) {
      docketNumber = this.roxInfo.start;
    } else {
      docketNumber = `${this.roxInfo.start} to ${this.roxInfo.end}`;
    }
    this.docketNumber.setValue(docketNumber);
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }

  get docketNumber() {
    return this.form.get('docketNumber');
  }
}
