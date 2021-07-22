import { MobilePhoneDealerSummary } from './mobile-phone-dealer-summary.model';
interface MobilePhoneDealerInfo {
  permitNumber: string;
  expiryDate: string;
}

interface StocksOfSparesAndAccessories {
  particular: string;
  numberOfUnits: number;
}

interface MobilePhone {
  model: string;
  imeiNumber: string;
  numberOfUnits: string;
}

interface SIM {
  simNumber: string;
  mobilePhoneCompany: string;
}

interface SundryOfInformation {
  one: string;
  two: string;
}

interface OwnerInfo {
  name: string;
  position: string;
}

export interface MobilePhoneDealer extends MobilePhoneDealerSummary {
  businessAddress: string;
  cellphoneNumber: string;
  faxNumber: string;
  addressOfMobilePhoneWarehouse: string;
  mobilePhoneDealerInfo: MobilePhoneDealerInfo;
  secDtiRegistrationNumber: string;
  businessMayorPermitNumber: string;
  listOfStocksOfSparesAndAccessories: StocksOfSparesAndAccessories[];
  listOfStocksOfMobilePhone: MobilePhone[];
  listOfStocksOfSubscriberIdentificationModule: SIM[];
  sundryOfInformation: SundryOfInformation;
  remarksDeficienciesDiscrepanciesNoted: string;
  inspectedBy: string;
  ownerInfo: OwnerInfo;
  recommendations: string;
}
