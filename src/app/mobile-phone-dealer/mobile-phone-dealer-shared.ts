import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false) => {
  return new FormGroup({
    dateInspected: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    permitNumber: new FormControl({ value: '', disabled: readState }),
    permitExpiryDate: new FormControl({ value: '', disabled: false }),
    listOfStocksOfSparesAndAccessories: new FormArray([]),
    listOfStocksOfMobilePhone: new FormArray([]),
    listOfStocksOfSubscriberIdentificationModule: new FormArray([]),
    sundryOfInformation: new FormGroup({
      oneCb: new FormControl({ value: '', disabled: readState }),
      twoCb: new FormControl({ value: '', disabled: readState }),
    }),
    remarksDeficienciesDiscrepanciesNoted: new FormControl({ value: '', disabled: readState }),
    inspectedBy: new FormControl({ value: '', disabled: readState }),
    ownerInfo: new FormGroup({
      name: new FormControl({ value: '', disabled: readState }),
      position: new FormControl({ value: '', disabled: readState }),
    }),
    recommendations: new FormControl({ value: '', disabled: readState }),
    notedBy: new FormControl({ value: '', disabled: readState }),
    regionalDirector: new FormControl({ value: '', disabled: readState }),
    notedByApproved: new FormControl({ value: '', disabled: false }),
    regionalDirectorApproved: new FormControl({ value: '', disabled: false }),
  });
};

export const stockSpareAndAccessoryInput = (readState = false): FormGroup => {
  return new FormGroup({
    particular: new FormControl({ value: '', disabled: readState }),
    numberOfUnits: new FormControl({ value: 0, disabled: readState }),
  });
};

export const stockMobilePhoneInput = (readState = false): FormGroup => {
  return new FormGroup({
    model: new FormControl({ value: '', disabled: readState }),
    imeiNumber: new FormControl({ value: '', disabled: readState }),
    source: new FormControl({ value: '', disabled: readState }),
  });
};

export const stockSIMInput = (readState = false): FormGroup => {
  return new FormGroup({
    simNumber: new FormControl({ value: '', disabled: readState }),
    mobilePhoneCompany: new FormControl({ value: '', disabled: readState }),
  });
};
