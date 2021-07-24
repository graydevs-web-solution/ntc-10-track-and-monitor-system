interface MobilePhoneDealerInfo {
  permitNumber: string;
  expiryDate: string;
}

export interface Dealer {
  id?: string;
  nameOfDealer: string;
  businessAddress: string;
  cellphoneNumber: string;
  faxNumber: string;
  addressOfMobilePhoneWarehouse: string;
  mobilePhoneDealerInfo: MobilePhoneDealerInfo;
  secDtiRegistrationNumber: string;
  businessMayorPermitNumber: string;
}
