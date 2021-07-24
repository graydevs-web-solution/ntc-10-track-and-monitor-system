interface MPSCInfo {
  permitNumber: string;
  expiryDate: string;
}

export interface ServiceCenter {
  id?: string;
  nameOfServiceCenter: string;
  businessAddress: string;
  cellphoneNumber: string;
  faxNumber: string;
  exactLocationOfService: string;
  mpscInfo: MPSCInfo;
  secDtiRegistrationNumber: string;
  businessMayorPermitNumber: string;
}
