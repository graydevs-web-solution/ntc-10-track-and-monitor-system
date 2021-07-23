import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ADD, EDIT } from 'src/app/shared/constants';
import { MobilePhoneDealerService } from '../../mobile-phone-dealer.service';

@Component({
  selector: 'app-mobile-phone-dealer-edit',
  templateUrl: './mobile-phone-dealer-edit.component.html',
  styleUrls: ['./mobile-phone-dealer-edit.component.css'],
})
export class MobilePhoneDealerEditComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private mobilePhoneDealerService: MobilePhoneDealerService,
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
      const fetchedValue = this.mobilePhoneDealerService.getSelectedEntry(this.formId);
      const entryDate = new Date(fetchedValue.dateInspected).toISOString();
      const formattedDate = DateTime.fromISO(entryDate).toFormat('yyyy-M-d');
      this.form.patchValue({ ...fetchedValue, dateInspected: formattedDate });
    }
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
        expiryDate: [''],
      }),
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
      listOfStocksOfSparesAndAccessories: this.formBuilder.array([]),
      listOfStocksOfMobilePhone: this.formBuilder.array([]),
      listOfStocksOfSubscriberIdentificationModule: this.formBuilder.array([]),
      sundryOfInformation: this.formBuilder.group({
        one: [''],
        two: [''],
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
      this.mobilePhoneDealerService.addOne(this.form.value);
    } else {
      this.mobilePhoneDealerService.updateOne(this.formId, this.form.value);
    }
  }

  addStockSpareAndAccessory(): void {
    this.listOfStocksOfSparesAndAccessories.push(
      this.formBuilder.group({
        particular: [''],
        numberOfUnits: [0],
      })
    );
  }

  addStockMobilePhone() {
    this.listOfStocksOfMobilePhone.push(
      this.formBuilder.group({
        model: [''],
        imeiNumber: [''],
        source: [''],
      })
    );
  }

  addStockSIM() {
    this.listOfStocksOfSubscriberIdentificationModule.push(
      this.formBuilder.group({
        simNumber: [''],
        mobilePhoneCompany: [''],
      })
    );
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
