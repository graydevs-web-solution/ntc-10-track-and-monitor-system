import { Client } from 'src/app/master-list/clients/models/client.model';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';

interface ServiceOrTestEquipments {
  particular: string;
  numberOfUnits: number;
}

interface EmployedElectronicsTechnicians {
  name: string;
  qualifications: string;
}

interface SundryOfInformation {
  oneCb: string;
  twoCb: string;
  threeCb: string;
}

interface OwnerInfo {
  name: string;
  position: string;
}

export interface ServiceCenterReport {
  id?: number;
  dateInspected: Date | string;
  clientId: number | Client;
  clientName?: string;
  permitNumber: string;
  permitExpiryDate: Date | string;
  listOfServiceOrTestEquipments: ServiceOrTestEquipments[];
  employedElectronicsTechnicians: EmployedElectronicsTechnicians[];
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
