import { Client } from 'src/app/master-list/clients/models/client.model';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';
interface StocksOfSparesAndAccessories {
  particular: string;
  numberOfUnits: number;
}

interface MobilePhone {
  model: string;
  imeiNumber: string;
  source: string;
}

interface SIM {
  simNumber: string;
  mobilePhoneCompany: string;
}

interface SundryOfInformation {
  oneCb: string;
  twoCb: string;
}

interface OwnerInfo {
  name: string;
  position: string;
}

export interface MobilePhoneDealer {
  id?: number;
  dateInspected: Date | string;
  clientId: number | Client;
  clientName?: string;
  permitNumber: string;
  permitExpiryDate: Date | string;
  listOfStocksOfSparesAndAccessories: StocksOfSparesAndAccessories[];
  listOfStocksOfMobilePhone: MobilePhone[];
  listOfStocksOfSubscriberIdentificationModule: SIM[];
  sundryOfInformation: SundryOfInformation;
  remarksDeficienciesDiscrepanciesNoted: string;
  inspectedBy: string;
  ownerInfo: OwnerInfo;
  recommendations: string;
  notedBy: string;
  notedByApproved: string;
  notedByInfo: UserAssignedData;
  regionalDirector: string;
  regionalDirectorApproved: string;
  regionalDirectorInfo: UserAssignedData;
}
