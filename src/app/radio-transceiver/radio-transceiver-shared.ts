import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

export const initForm = (readState = false): FormGroup => {
  return new FormGroup({
    dateIssued: new FormControl({ value: '', disabled: false }),
    clientId: new FormControl({ value: '', disabled: false }),
    classType: new FormControl({ value: '', disabled: false }),
    natureOfService: new FormControl({ value: '', disabled: false }),
    workingHours: new FormControl({ value: '', disabled: false }),
    formType: new FormControl({ value: '', disabled: readState }),
    callSign: new FormControl({ value: '', disabled: false }),
    motorNumber: new FormControl({ value: '', disabled: false }),
    plateNumber: new FormControl({ value: '', disabled: false }),
    grossTonnage: new FormControl({ value: '', disabled: false }),
    ppInfo: new FormGroup({
      ppNumber: new FormControl({ value: '', disabled: false }),
      dateIssued: new FormControl({ value: '', disabled: false }),
    }),
    tpInfo: new FormGroup({
      tpNumber: new FormControl({ value: '', disabled: false }),
      expirationDate: new FormControl({ value: '', disabled: false }),
    }),
    cpInfo: new FormGroup({
      cpNumber: new FormControl({ value: '', disabled: false }),
      expirationDate: new FormControl({ value: '', disabled: false }),
    }),
    licInfo: new FormGroup({
      licNumber: new FormControl({ value: '', disabled: false }),
      expirationDate: new FormControl({ value: '', disabled: false }),
    }),
    pointsOfCommunication: new FormControl({ value: '', disabled: false }),
    operators: new FormArray([]),
    radioTransceivers: new FormArray([]),
    receivers: new FormArray([]),
    otherEquipments: new FormArray([]),
    frequenciesInfo: new FormGroup({
      assignedFreq: new FormControl({ value: '', disabled: false }),
      crystalFreq: new FormControl({ value: '', disabled: false }),
      measuredFreq: new FormControl({ value: '', disabled: false }),
      ifReceiver: new FormControl({ value: '', disabled: false }),
      typeOfEmission: new FormControl({ value: '', disabled: false }),
    }),
    antennaSystemInfo: new FormGroup({
      type: new FormControl({ value: '', disabled: false }),
      elevationFromGmd: new FormControl({ value: '', disabled: false }),
      lengthOfRadiator: new FormControl({ value: '', disabled: false }),
      gain: new FormControl({ value: '', disabled: false }),
      directivity: new FormControl({ value: '', disabled: false }),
      powerSupply: new FormControl({ value: '', disabled: false }),
      battery: new FormControl({ value: '', disabled: false }),
      voltageAndType: new FormControl({ value: '', disabled: false }),
      capacity: new FormControl({ value: '', disabled: false }),
      ah: new FormControl({ value: '', disabled: false }),
    }),
    illegalConstructionInfo: new FormGroup({
      constructionsOfRadioStationsWithoutConstructionPermit: new FormControl({ value: false, disabled: readState }),
      illegalTransfer: new FormControl({ value: false, disabled: readState }),
    }),
    illegalOperationInfo: new FormGroup({
      operationWithoutRadioStationLicensePermit: new FormControl({ value: false, disabled: readState }),
      operationWithoutLicenseRadioOperator: new FormControl({ value: false, disabled: readState }),
      operationWithoutLogbook: new FormControl({ value: false, disabled: readState }),
      operationOnLowerSideband: new FormControl({ value: false, disabled: readState }),
      operationOnUnauthorizedHours: new FormControl({ value: false, disabled: readState }),
      operatingOnUnauthorizedFrequency: new FormControl({ value: false, disabled: readState }),
      offFrequency: new FormControl({ value: false, disabled: readState }),
      stillInTheOldFrequencyGrouping: new FormControl({ value: false, disabled: readState }),
    }),
    illegalPossession: new FormControl({ value: false, disabled: readState }),
    others: new FormControl({ value: '', disabled: false }),
    sundrayInformationAboutRS: new FormGroup({
      isRadioOperatorEntryLogbooK: new FormControl({ value: '', disabled: false }),
      isStationProduceUnwantedSignals: new FormControl({ value: '', disabled: false }),
      isRadioEquipmentOperativeOnInspection: new FormControl({ value: '', disabled: false }),
    }),
    authorizedRepresentative: new FormControl({ value: '', disabled: false }),
    radioRegulationInspector: new FormControl({ value: '', disabled: false }),
    recommendations: new FormControl({ value: '', disabled: false }),
    notedBy: new FormControl({ value: '', disabled: false }),
    regionalDirector: new FormControl({ value: '', disabled: false }),
    notedByApproved: new FormControl({ value: '', disabled: false }),
    regionalDirectorApproved: new FormControl({ value: '', disabled: false }),
  });
};

export const operatorInput = (): FormGroup => {
  return new FormGroup({
    id: new FormControl({ value: null, disabled: false }),
    name: new FormControl({ value: '', disabled: false }),
    particularOfLicense: new FormControl({ value: '', disabled: false }),
    expirationDate: new FormControl({ value: '', disabled: false }),
  });
};

export const radioTransceiverEntryInput = (): FormGroup => {
  return new FormGroup({
    id: new FormControl({ value: null, disabled: false }),
    model: new FormControl({ value: '', disabled: false }),
    serialNumber: new FormControl({ value: '', disabled: false }),
    freqRange: new FormControl({ value: '', disabled: false }),
    powerOutput: new FormControl({ value: '', disabled: false }),
    freqControl: new FormControl({ value: '', disabled: false }),
  });
};

export const receiverOrOtherEquipmentInput = (): FormGroup => {
  return new FormGroup({
    id: new FormControl({ value: null, disabled: false }),
    name: new FormControl({ value: '', disabled: false }),
    serialNumber: new FormControl({ value: '', disabled: false }),
    freqRange: new FormControl({ value: '', disabled: false }),
    powerOutput: new FormControl({ value: '', disabled: false }),
    freqControl: new FormControl({ value: '', disabled: false }),
  });
};
