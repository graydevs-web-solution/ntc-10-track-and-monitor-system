import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceCenterReportService } from './../../service-center-report.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import { ADD, clientSearch, EDIT, userSearch } from 'src/app/shared/constants';
import { employedETInput, initForm, serviceOrTestEquipmentInput } from '../../service-center-shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { formatName } from 'src/app/shared/utility';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';

@Component({
  selector: 'app-service-center-report-edit',
  templateUrl: './service-center-report-edit.component.html',
  styleUrls: ['./service-center-report-edit.component.css'],
})
export class ServiceCenterReportEditComponent implements OnInit, OnDestroy {
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
  userInfo = this.authService.getUserInfo();

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  alert = {
    type: '',
    description: '',
  };
  disableDuringProcess = false;

  constructor(
    private serviceCenterReportService: ServiceCenterReportService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
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
      },
    });

    if (this.formMode === EDIT) {
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
      this.serviceCenterReportService.resourceType.next(EDIT);
    } else {
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.notedByInfo = this.systemService.getNotedByInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id, notedBy: this.notedByInfo.user_id });
      this.serviceCenterReportService.resourceType.next(ADD);
    }
  }

  ngOnDestroy() {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm(): void {
    this.form = initForm();
  }

  submit(): void {
    this.alert.type = 'info';
    this.alert.description = 'Saving data...';
    this.disableDuringProcess = true;
    if (this.formMode === ADD) {
      console.log('start');
      this.serviceCenterReportService
        .addOne(this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: async (res) => {
            this.serviceCenterReportService.getEntriesAPI();
            await this.router.navigate(['/service-center']);
          },
          error: (error) => {
            this.alert.type = 'danger';
            this.alert.description = 'Unknown error';
            this.disableDuringProcess = true;
          },
        });
    } else {
      this.serviceCenterReportService
        .updateOne(this.formId, this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: async (res) => {
            this.serviceCenterReportService.getEntriesAPI();
            await this.router.navigate(['/service-center']);
          },
          error: (error) => {
            this.alert.type = 'danger';
            this.alert.description = 'Unknown error';
            this.disableDuringProcess = true;
          },
        });
    }
  }

  addServiceOrTestEquipment(): void {
    this.listOfServiceOrTestEquipments.push(serviceOrTestEquipmentInput());
  }

  removedServiceOrTestEquipment(index: number): void {
    this.listOfServiceOrTestEquipments.removeAt(index);
  }

  addEmployedElectronicTechnician() {
    this.employedElectronicsTechnicians.push(employedETInput());
  }

  removeEmployedElectronicTechnician(index: number) {
    this.employedElectronicsTechnicians.removeAt(index);
  }

  open(userType: 'client' | 'user'): void {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    if (userType === 'client') {
      modalRef.componentInstance.componentName = clientSearch;
      return;
    }
    modalRef.componentInstance.componentName = userSearch;
  }

  get listOfServiceOrTestEquipments(): FormArray {
    return this.form.get('listOfServiceOrTestEquipments') as FormArray;
  }

  get employedElectronicsTechnicians(): FormArray {
    return this.form.get('employedElectronicsTechnicians') as FormArray;
  }
}
