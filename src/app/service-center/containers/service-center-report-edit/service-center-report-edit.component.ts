import { ActivatedRoute, Params } from '@angular/router';
import { ServiceCenterReportService } from './../../service-center-report.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { ADD, EDIT } from 'src/app/shared/constants';

@Component({
  selector: 'app-service-center-report-edit',
  templateUrl: './service-center-report-edit.component.html',
  styleUrls: ['./service-center-report-edit.component.css'],
})
export class ServiceCenterReportEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;
  formMode = ADD;

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private serviceCenterReportService: ServiceCenterReportService,
    private route: ActivatedRoute
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
    if (this.formMode === EDIT) {
      const fetchedValue = this.serviceCenterReportService.getSelectedEntry(this.formId);
      const entryDate = new Date(fetchedValue.dateInspected).toISOString();
      const formattedDate = DateTime.fromISO(entryDate).toFormat('yyyy-M-d');
      this.form.patchValue({ ...fetchedValue, dateInspected: formattedDate });
    }
  }

  ngOnDestroy() {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      dateInspected: [''],
      nameOfServiceCenter: [''],
      businessAddress: [''],
      cellphoneNumber: [''],
      faxNumber: [''],
      exactLocationOfServiceCenter: [''],
      mpscInfo: this.formBuilder.group({
        permitNumber: [''],
        expiryDate: [''],
      }),
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
      listOfServiceOrTestEquipments: this.formBuilder.array([]),
      employedElectronicsTechnicians: this.formBuilder.array([]),
      sundryOfInformation: this.formBuilder.group({
        one: [''],
        two: [''],
        three: [''],
      }),
      remarksDeficienciesDiscrepanciesNoted: [''],
      inspectedBy: [''],
      ownerInfo: this.formBuilder.group({
        name: [''],
        position: [''],
      }),
      recommendations: [''],
      notedBy: [''],
      isApproved: [false],
      approver: [''],
    });
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.serviceCenterReportService.addOne(this.form.value);
    } else {
      this.serviceCenterReportService.updateOne(this.formId, this.form.value);
    }
  }

  addServiceOrTestEquipment(): void {
    this.listOfServiceOrTestEquipments.push(
      this.formBuilder.group({
        particular: [''],
        numberOfUnits: [0],
      })
    );
  }

  addEmployedElectronicTechnician() {
    this.employedElectronicsTechnicians.push(
      this.formBuilder.group({
        name: [''],
        qualifications: [''],
      })
    );
  }

  get listOfServiceOrTestEquipments(): FormArray {
    return this.form.get('listOfServiceOrTestEquipments') as FormArray;
  }

  get employedElectronicsTechnicians(): FormArray {
    return this.form.get('employedElectronicsTechnicians') as FormArray;
  }
}
