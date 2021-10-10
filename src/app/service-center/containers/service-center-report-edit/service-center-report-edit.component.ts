import { ActivatedRoute, Params } from '@angular/router';
import { ServiceCenterReportService } from './../../service-center-report.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { employedETInput, initForm, serviceOrTestEquipmentInput } from '../../service-center-shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';

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

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private serviceCenterReportService: ServiceCenterReportService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
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

    if (this.formMode === EDIT) {
      const fetchedValue = this.serviceCenterReportService.getSelectedEntry(this.formId);
      fetchedValue.listOfServiceOrTestEquipments.forEach(() => {
        this.addServiceOrTestEquipment();
      });
      fetchedValue.employedElectronicsTechnicians.forEach(() => {
        this.addEmployedElectronicTechnician();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({ ...fetchedValue });
      this.serviceCenterReportService.resourceType.next(EDIT);
    } else {
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
    if (this.formMode === ADD) {
      this.serviceCenterReportService
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
      this.serviceCenterReportService
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

  addServiceOrTestEquipment(): void {
    this.listOfServiceOrTestEquipments.push(serviceOrTestEquipmentInput());
  }

  addEmployedElectronicTechnician() {
    this.employedElectronicsTechnicians.push(employedETInput());
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  get listOfServiceOrTestEquipments(): FormArray {
    return this.form.get('listOfServiceOrTestEquipments') as FormArray;
  }

  get employedElectronicsTechnicians(): FormArray {
    return this.form.get('employedElectronicsTechnicians') as FormArray;
  }
}
