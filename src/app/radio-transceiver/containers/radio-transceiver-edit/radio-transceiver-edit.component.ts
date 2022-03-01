import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import { ADD, clientSearch, EDIT, userSearch } from 'src/app/shared/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { operatorInput, radioTransceiverEntryInput, receiverOrOtherEquipmentInput, initForm } from '../../radio-transceiver-shared';
import { formatName, isArrayValue } from 'src/app/shared/utility';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';

@Component({
  selector: 'app-radio-transceiver-edit',
  templateUrl: './radio-transceiver-edit.component.html',
  styleUrls: ['./radio-transceiver-edit.component.css'],
})
export class RadioTransceiverEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';
  regDirectorInfo = {
    ['user_id']: '',
    name: '',
  };
  notedByInfo = {
    ['user_id']: '',
    name: '',
  };
  userSelectSub: Subscription;
  formatName = formatName;

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  alert = {
    type: '',
    description: '',
  };
  disableDuringProcess = false;

  constructor(
    private formBuilder: FormBuilder,
    private radioTransceiverService: RadioTransceiverService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
    private systemService: SystemSettingService,
    private authService: AuthService,
    private router: Router
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
        this.form.patchValue({ clientId: response.id });
        this.clientName = response.businessName;
        this.cd.detectChanges();
      },
    });

    this.userSelectSub = this.authService.selectedEntryUser.subscribe({
      next: (res) => {
        const data: UserAssignedData = { ['user_id']: res.user_id, name: this.formatName(res), position: res.position };
        this.notedByInfo = { ['user_id']: data.user_id, name: data.name };
        this.form.patchValue({ notedBy: data.user_id });
        console.log(this.notedByInfo);
      },
    });

    if (this.formMode === EDIT) {
      this.radioTransceiverService.resourceType.next(EDIT);
      const fetchedValue = this.radioTransceiverService.getSelectedEntry(this.formId);
      console.log(fetchedValue);
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
        notedBy: fetchedValue.notedByInfo.user_id,
        regionalDirector: fetchedValue.regionalDirectorInfo.user_id,
      });
      this.regDirectorInfo = {
        name: fetchedValue.regionalDirectorInfo.name,
        ['user_id']: fetchedValue.regionalDirectorInfo.user_id,
      };
      this.notedByInfo = {
        name: fetchedValue.notedByInfo.name,
        ['user_id']: fetchedValue.notedByInfo.user_id,
      };
    } else {
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.notedByInfo = this.systemService.getNotedByInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id, notedBy: this.notedByInfo.user_id });
      this.radioTransceiverService.resourceType.next(ADD);
    }
  }

  ngOnDestroy() {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm() {
    this.form = initForm();
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

  submit() {
    try {
      this.alert.type = 'info';
      this.alert.description = 'Saving data...';
      this.disableDuringProcess = true;
      if (this.formMode === ADD) {
        this.radioTransceiverService
          .addOne(this.form.value)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: async (response) => {
              this.radioTransceiverService.getEntriesAPI();
              await this.router.navigate(['/radio-transceiver']);
            },
            error: (error) => {
              throw error;
            },
          });
      } else {
        this.radioTransceiverService
          .updateOne(this.formId, this.form.value)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: async (response) => {
              this.radioTransceiverService.getEntriesAPI();
              await this.router.navigate(['/radio-transceiver']);
            },
            error: (error) => {
              throw error;
            },
          });
      }
    } catch (error) {
      this.alert.type = 'danger';
      this.alert.description = 'Unknown error';
      this.disableDuringProcess = true;
    }
  }

  open(userType: 'client' | 'user'): void {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    if (userType === 'client') {
      modalRef.componentInstance.componentName = clientSearch;
      return;
    }
    modalRef.componentInstance.componentName = userSearch;
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
