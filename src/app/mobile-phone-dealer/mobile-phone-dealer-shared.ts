import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    dateInspected: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    listOfStocksOfSparesAndAccessories: new FormArray([]),
    listOfStocksOfMobilePhone: new FormArray([]),
    listOfStocksOfSubscriberIdentificationModule: new FormArray([]),
    sundryOfInformation: new FormGroup({
      one: new FormControl({ value: '', disabled: readState }),
      two: new FormControl({ value: '', disabled: readState }),
    }),
    remarksDeficienciesDiscrepanciesNoted: new FormControl({ value: '', disabled: readState }),
    inspectedBy: new FormControl({ value: '', disabled: readState }),
    ownerInfo: new FormGroup({
      name: new FormControl({ value: '', disabled: readState }),
      position: new FormControl({ value: '', disabled: readState }),
    }),
    recommendations: new FormControl({ value: '', disabled: readState }),
    notedBy: new FormControl({ value: '', disabled: readState }),
    isApproved: new FormControl({ value: false, disabled: false }),
    regionalDirector: new FormControl({ value: '', disabled: readState }),
  });
};

export const stockSpareAndAccessoryInput = (): FormGroup => {
  return new FormGroup({
    particular: new FormControl({ value: '', disabled: false }),
    numberOfUnits: new FormControl({ value: 0, disabled: false }),
  });
};

export const stockMobilePhoneInput = (): FormGroup => {
  return new FormGroup({
    model: new FormControl({ value: '', disabled: false }),
    imeiNumber: new FormControl({ value: '', disabled: false }),
    source: new FormControl({ value: '', disabled: false }),
  });
};

export const stockSIMInput = (): FormGroup => {
  return new FormGroup({
    simNumber: new FormControl({ value: '', disabled: false }),
    mobilePhoneCompany: new FormControl({ value: '', disabled: false }),
  });
};
