interface PPInfo {
  ppNumber: string;
  dateIssued: Date;
}

interface CPInfo {
  ppNumber: string;
  dateIssued: Date;
}

interface LicInfo {
  ppNumber: string;
  dateIssued: Date;
}

interface Operator {
  name: string;
  particularOfLicense: string;
  expirationDate: Date;
}

interface RadioTransceiverItem {
  model: string;
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
  antennaSystemType: string;
  elevationFromGmd: string;
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
  operatingOnUnauthorizedFrequency: boolean;
}

export interface RadioTransceiver {
  id?: string;
  date: Date | string;
  nameOfStation: string;
  officePostalAddress: string;
  exactLocationOfStation: string;
  class: string;
  natureOfService: string;
  workingHours: string;
  type: string;
  callSign: string;
  ppInfo: PPInfo;
  cpInfo: CPInfo;
  licInfo: LicInfo;
  pointsOfCommunication: string;
  operators: Operator[];
  radioTransceivers: RadioTransceiverItem[];
  frequenciesInfo: FrequenciesInfo;
  illegalCOnstructionInfo: IllegalConstructionInfo;
  illegalOperationInfo: IllegalOperationInfo;
  illegalPossession: boolean;
  others: string;
  radioRegulationInspector: string;
  authorizedRepresentative: string;
  regionalDirector: string;
}
