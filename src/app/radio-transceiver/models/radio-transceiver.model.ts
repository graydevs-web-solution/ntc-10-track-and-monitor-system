import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';

interface PPInfo {
  ppNumber: string;
  dateIssued: Date | string;
}

interface TPInfo {
  tpNumber: string;
  expirationDate: Date | string;
}

interface CPInfo {
  cpNumber: string;
  expirationDate: Date | string;
}

interface LicInfo {
  licNumber: string;
  expirationDate: Date | string;
}

interface Operator {
  id?: number;
  name: string;
  particularOfLicense: string;
  expirationDate: Date | string;
}

interface RadioTransceiverItem {
  id?: number;
  model: string;
  serialNumber: string;
  freqRange: string;
  powerOutput: string;
  freqControl: string;
}

interface ReceiverAndOtherEquipmentsItem {
  id?: number;
  name: string;
  serialNumber: string;
  freqRange: string;
  powerOutput: string;
  freqControl: string;
}

interface FrequenciesInfo {
  assignedFreq: string;
  crystalFreq: string;
  measuredFreq: string;
  ifReceiver: string;
  typeOfEmission: string;
}

interface AntennaSystemInfo {
  type: string;
  elevationFromGmd: string;
  lengthOfRadiator: string;
  gain: string;
  directivity: string;
  powerSupply: string;
  battery: string;
  voltageAndType: string;
  capacity: string;
  ah: string;
}

interface IllegalConstructionInfo {
  constructionsOfRadioStationsWithoutConstructionPermit: boolean;
  illegalTransfer: boolean;
}

interface IllegalOperationInfo {
  operationWithoutRadioStationLicensePermit: boolean;
  operationWithoutLicenseRadioOperator: boolean;
  operationWithoutLogbook: boolean;
  operationOnLowerSideband: boolean;
  operationOnUnauthorizedHours: boolean;
  operatingOnUnauthorizedFrequency: boolean;
  offFrequency: boolean;
  stillInTheOldFrequencyGrouping: boolean;
}

interface SundrayInformationAboutRS {
  isRadioOperatorEntryLogbooK: string;
  isStationProduceUnwantedSignals: string;
  isRadioEquipmentOperativeOnInspection: string;
}

export interface RadioTransceiver {
  id?: number;
  dateIssued: Date | string;
  clientId: number;
  clientName?: string;
  classType: string;
  natureOfService: string;
  workingHours: string;
  formType: string;
  callSign: string;
  motorNumber: string;
  plateNumber: string;
  grossTonnage: string;
  ppInfo: PPInfo;
  tpInfo: TPInfo;
  cpInfo: CPInfo;
  licInfo: LicInfo;
  pointsOfCommunication: string;
  operators: Operator[];
  radioTransceivers: RadioTransceiverItem[];
  receivers: ReceiverAndOtherEquipmentsItem[];
  otherEquipments: ReceiverAndOtherEquipmentsItem[];
  frequenciesInfo: FrequenciesInfo;
  antennaSystemInfo: AntennaSystemInfo;
  illegalConstructionInfo: IllegalConstructionInfo;
  illegalOperationInfo: IllegalOperationInfo;
  illegalPossession: boolean;
  others: string;
  sundrayInformationAboutRS: SundrayInformationAboutRS;
  authorizedRepresentative: string;
  radioRegulationInspector: string;
  recommendations: string;
  notedBy: string;
  notedByApproved: string;
  regionalDirector: string;
  regionalDirectorApproved: string;
  notedByInfo?: UserAssignedData;
  regionalDirectorInfo?: UserAssignedData;
}
