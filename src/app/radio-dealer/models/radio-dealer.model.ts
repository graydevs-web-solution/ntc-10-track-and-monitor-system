import { Client } from 'src/app/master-list/clients/models/client.model';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';
interface SupervisingECE {
  name: string;
  licenseNumber: string;
  expiryDate: Date | string;
  ptrNumber: string;
  dateIssued: Date | string;
}

interface Technician {
  name: string;
  particularsOfLicense: string;
  expiryDate: Date | string;
}

interface DiagnosticTestEquipmentAndMeasuringInstrumentInfo {
  reflectometer: boolean;
  frequencyCounter: boolean;
  powerMeter: boolean;
  vtvmDigitalMultimeter: boolean;
  signalGenerator: boolean;
  oscilloscope: boolean;
  vomDigitalMultimeter: boolean;
  dummyLoadAntenna: boolean;
}

export interface RadioDealer {
  id?: number;
  dateInspected: Date | string;
  clientId: number | Client;
  clientName?: string;
  permitNumber: string;
  permitExpiryDate: Date | string;
  supervisingECE: SupervisingECE[];
  radioTechnicians: Technician[];
  diagnosticTestEquipmentAndMeasuringInstrumentInfo: DiagnosticTestEquipmentAndMeasuringInstrumentInfo;
  isLaboratoryRoomShielded: boolean;
  remarks: string;
  radioRegulationInspector: string;
  ownerName: string;
  recommendations: string;
  notedBy: string;
  notedByApproved: string;
  notedByInfo: UserAssignedData;
  regionalDirector: string;
  regionalDirectorApproved: string;
  regionalDirectorInfo: UserAssignedData;
}
