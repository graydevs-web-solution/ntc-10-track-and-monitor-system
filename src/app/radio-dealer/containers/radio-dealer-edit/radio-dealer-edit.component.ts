import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { formatName } from 'src/app/shared/utility';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { initForm, supervisingECEInput, techniciansInput } from '../../radio-dealer-shared';
import { RadioDealerService } from '../../radio-dealer.service';

@Component({
  selector: 'app-radio-dealer-edit',
  templateUrl: './radio-dealer-edit.component.html',
  styleUrls: ['./radio-dealer-edit.component.css'],
})
export class RadioDealerEditComponent implements OnInit {
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
    private radioDealerService: RadioDealerService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router,
    private systemService: SystemSettingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .pipe(
        map((params: Params) => {
          return params.id;
        }),
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
      },
    });

    if (this.formMode === EDIT) {
      const fetchedValue = this.radioDealerService.getSelectedEntry(this.formId);
      fetchedValue.supervisingECE.forEach(() => {
        this.addSupervisingECE();
      });
      fetchedValue.radioTechnicians.forEach(() => {
        this.addTechnicians();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({
        ...fetchedValue,
        regionalDirector: fetchedValue.regionalDirectorInfo.user_id,
      });
      this.regDirectorInfo = {
        name: fetchedValue.regionalDirectorInfo.name,
        ['user_id']: fetchedValue.regionalDirectorInfo.user_id,
      };
      this.radioDealerService.resourceType.next(EDIT);
    } else {
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id });
      this.radioDealerService.resourceType.next(ADD);
    }
  }

  initForm(): void {
    this.form = initForm();
  }

  submit(): void {
    this.alert.type = 'info';
    this.alert.description = 'Saving data...';
    this.disableDuringProcess = true;
    if (this.formMode === ADD) {
      this.radioDealerService
        .addOne(this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: async (res) => {
            this.radioDealerService.getEntriesAPI();
            await this.router.navigate(['/radio-transceiver']);
          },
          error: (error) => {
            this.alert.type = 'danger';
            this.alert.description = 'Unknown error';
            this.disableDuringProcess = true;
          },
        });
    } else {
      this.radioDealerService
        .updateOne(this.formId, this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: async (res) => {
            this.radioDealerService.getEntriesAPI();
            await this.router.navigate(['/radio-transceiver']);
          },
          error: (error) => {
            this.alert.type = 'danger';
            this.alert.description = 'Unknown error';
            this.disableDuringProcess = true;
          },
        });
    }
  }

  addSupervisingECE(): void {
    this.supervisingECE.push(supervisingECEInput());
  }

  removeSupervisingECE(index: number): void {
    this.supervisingECE.removeAt(index);
  }

  addTechnicians() {
    this.radioTechnicians.push(techniciansInput());
  }

  removeTechnicians(index: number) {
    this.radioTechnicians.removeAt(index);
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  get supervisingECE(): FormArray {
    return this.form.get('supervisingECE') as FormArray;
  }

  get radioTechnicians(): FormArray {
    return this.form.get('radioTechnicians') as FormArray;
  }
}
