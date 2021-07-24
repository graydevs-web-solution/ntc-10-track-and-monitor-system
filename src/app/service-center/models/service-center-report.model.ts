import { ServiceCenterReportSummary } from './service-center-report-summary.model';

interface MPSCInfo {
  permitNumber: string;
  expiryDate: string;
}

interface ServiceOrTestEquipments {
  particular: string;
  numberOfUnits: number;
}

interface EmployedElectronicsTechnicians {
  name: string;
  qualifications: string;
}

interface SIM {
  simNumber: string;
  mobilePhoneCompany: string;
}

interface SundryOfInformation {
  one: string;
  two: string;
  three: string;
}

interface OwnerInfo {
  name: string;
  position: string;
}

export interface ServiceCenterReport extends ServiceCenterReportSummary {
  businessAddress: string;
  cellphoneNumber: string;
  faxNumber: string;
  exactLocationOfService: string;
  mpscInfo: MPSCInfo;
  secDtiRegistrationNumber: string;
  businessMayorPermitNumber: string;
  listOfServiceOrTestEquipments: ServiceOrTestEquipments[];
  employedElectronicsTechnicians: EmployedElectronicsTechnicians[];
  sundryOfInformation: SundryOfInformation;
  remarksDeficienciesDiscrepanciesNoted: string;
  inspectedBy: string;
  ownerInfo: OwnerInfo;
  recommendations: string;
}
