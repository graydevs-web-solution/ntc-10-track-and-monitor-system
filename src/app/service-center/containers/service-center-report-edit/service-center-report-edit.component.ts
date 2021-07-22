import { ServiceCenterReportService } from './../../service-center-report.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-service-center-report-edit',
  templateUrl: './service-center-report-edit.component.html',
  styleUrls: ['./service-center-report-edit.component.css']
})
export class ServiceCenterReportEditComponent implements OnInit {
  form: FormGroup;

  faCalendarAlt = faCalendarAlt;

  constructor(private formBuilder: FormBuilder,
    private serviceCenterReportService: ServiceCenterReportService) { }

  ngOnInit(): void {
    this.initForm();
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
        expiryDate: ['']
      }),
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
      listOfServiceOrTestEquipments: this.formBuilder.array([]),
      employedElectronicsTechnicians: this.formBuilder.array([]),
      sundryOfInformation: this.formBuilder.group({
        one: [''],
        two: [''],
        three: ['']
      }),
      remarksDeficienciesDiscrepanciesNoted: [''],
      inspectedBy: [''],
      ownerInfo: this.formBuilder.group({
        name: [''],
        position: ['']
      }),
      recommendations: [''],
      notedBy: [''],
      isApproved: [false],
      approver: ['']
    });
  }

  submit(): void {
    this.serviceCenterReportService.addOne(this.form.value);
  }

  addServiceOrTestEquipment(): void {
    this.listOfServiceOrTestEquipments.push(this.formBuilder.group({
      particular: [''],
      numberOfUnits: [0]
    }));
  }

  addEmployedElectronicTechnician() {
    this.employedElectronicsTechnicians.push(this.formBuilder.group({
      name: [''],
      qualifications: [''],
    }));
  }

  get listOfServiceOrTestEquipments(): FormArray {
    return this.form.get('listOfServiceOrTestEquipments') as FormArray;
  }

  get employedElectronicsTechnicians(): FormArray {
    return this.form.get('employedElectronicsTechnicians') as FormArray;
  }
}
