import { ServiceCenterReportService } from './../../service-center-report.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { employedETInput, initForm, serviceOrTestEquipmentInput } from '../../service-center-shared';
import { VIEW } from 'src/app/shared/constants';

@Component({
  selector: 'app-service-center-report-view',
  templateUrl: './service-center-report-view.component.html',
  styleUrls: ['./service-center-report-view.component.css'],
})
export class ServiceCenterReportViewComponent implements OnInit {
  form: FormGroup;
  formId: string;
  clientName = '';

  faCalendarAlt = faCalendarAlt;
  faFilePdf = faFilePdf;

  getDestroyed = new Subject();

  constructor(private serviceCenterReportService: ServiceCenterReportService, private route: ActivatedRoute) {}

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
    const fetchedValue = this.serviceCenterReportService.getSelectedEntry(this.formId);
    fetchedValue.listOfServiceOrTestEquipments.forEach(() => {
      this.addServiceOrTestEquipment();
    });
    fetchedValue.employedElectronicsTechnicians.forEach(() => {
      this.addEmployedElectronicTechnician();
    });
    this.clientName = fetchedValue.clientName;
    console.log(fetchedValue);
    this.form.patchValue({
      ...fetchedValue,
      notedBy: fetchedValue.notedByInfo.name,
      regionalDirector: fetchedValue.regionalDirectorInfo.name,
    });
    this.serviceCenterReportService.resourceType.next(VIEW);
  }

  initForm(): void {
    this.form = initForm();
  }

  submit(): void {
    this.serviceCenterReportService.addOne(this.form.value);
  }

  addServiceOrTestEquipment(): void {
    this.listOfServiceOrTestEquipments.push(serviceOrTestEquipmentInput());
  }

  addEmployedElectronicTechnician() {
    this.employedElectronicsTechnicians.push(employedETInput());
  }

  generatePdf(): void {
    this.serviceCenterReportService.generatePdf(this.formId);
  }

  get listOfServiceOrTestEquipments(): FormArray {
    return this.form.get('listOfServiceOrTestEquipments') as FormArray;
  }

  get employedElectronicsTechnicians(): FormArray {
    return this.form.get('employedElectronicsTechnicians') as FormArray;
  }
}
