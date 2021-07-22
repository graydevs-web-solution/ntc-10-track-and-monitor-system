import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile-phone-dealer-edit',
  templateUrl: './mobile-phone-dealer-edit.component.html',
  styleUrls: ['./mobile-phone-dealer-edit.component.css']
})
export class MobilePhoneDealerEditComponent implements OnInit {
  form: FormGroup;

  faCalendarAlt = faCalendarAlt;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      dateInspected: [''],
      nameOfDealer: [''],
      businessAddress: [''],
      cellphoneNumber: [''],
      faxNumber: [''],
      addressOfMobilePhoneWarehouse: [''],
      mobilePhoneDealerInfo: this.formBuilder.group({
        permitNumber: [''],
        expiryDate: ['']
      }),
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
      listOfStocksOfSparesAndAccessories: this.formBuilder.array([]),
      listOfStocksOfMobilePhone: this.formBuilder.array([]),
      listOfStocksOfSubscriberIdentificationModule: this.formBuilder.array([]),
      sundryOfInformation: this.formBuilder.group({
        one: [''],
        two: ['']
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
    console.log(this.form.value);
  }

  addStockSpareAndAccessory(): void {
    this.listOfStocksOfSparesAndAccessories.push(this.formBuilder.group({
      particular: [''],
      numberOfUnits: [0]
    }));
  }

  addStockMobilePhone() {
    this.listOfStocksOfMobilePhone.push(this.formBuilder.group({
      model: [''],
      imeiNumber: [''],
      source: ['']
    }));
  }

  addStockSIM() {
    this.listOfStocksOfSubscriberIdentificationModule.push(this.formBuilder.group({
      simNumber: [''],
      mobilePhoneCompany: ['']
    }));
  }

  get listOfStocksOfSparesAndAccessories(): FormArray {
    return this.form.get('listOfStocksOfSparesAndAccessories') as FormArray;
  }

  get listOfStocksOfMobilePhone(): FormArray {
    return this.form.get('listOfStocksOfMobilePhone') as FormArray;
  }

  get listOfStocksOfSubscriberIdentificationModule(): FormArray {
    return this.form.get('listOfStocksOfSubscriberIdentificationModule') as FormArray;
  }
}
