import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { RadioTransceiverService } from './../../radio-transceiver.service';

@Component({
  selector: 'app-radio-transceiver-edit',
  templateUrl: './radio-transceiver-edit.component.html',
  styleUrls: ['./radio-transceiver-edit.component.css'],
})
export class RadioTransceiverEditComponent implements OnInit {
  form: FormGroup;

  faCalendarAlt = faCalendarAlt;

  constructor(private formBuilder: FormBuilder, private radioTransceiverService: RadioTransceiverService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      date: [''],
      nameOfStation: [''],
      officePostalAddress: [''],
      exactLocationOfStation: [''],
      class: [''],
      natureOfService: [''],
      workingHours: [''],
      type: [''],
      callSign: [''],
      ppInfo: this.formBuilder.group({
        ppNumber: [''],
        dateIssued: [''],
      }),
      cpInfo: this.formBuilder.group({
        cpNumber: [''],
        expirationDate: [''],
      }),
      licInfo: this.formBuilder.group({
        licNumber: [''],
        expirationDate: [''],
      }),
      pointsOfCommunication: [''],
      operators: this.formBuilder.array([]),
      radioTransceivers: this.formBuilder.array([]),
      frequenciesInfo: this.formBuilder.group({
        assignedFreq: [''],
        crystalFreq: [''],
        measuredFreq: [''],
        ifReceiver: [''],
        typeOfEmission: [''],
        antennaSystemType: [''],
        elevationFromGmd: [''],
        gain: [''],
        directivity: [''],
        powerSupply: [''],
        battery: [''],
        voltageAndType: [''],
        capacity: [''],
        ah: [''],
      }),
      illegalConstructionInfo: this.formBuilder.group({
        constructionsOfRadioStationsWithoutConstructionPermit: [false],
        illegalTransfer: [false],
      }),
      illegalOperationInfo: this.formBuilder.group({
        operationWithoutRadioStationLicensePermit: [false],
        operationWithoutLicenseRadioOperator: [false],
        operationWithoutLogbook: [false],
        operatingOnUnauthorizedFrequency: [false],
      }),
      illegalPossession: [false],
      others: [''],
      radioRegulationInspector: [''],
      authorizedRepresentative: [''],
      regionalDirector: [''],
    });
  }

  addOperatorInput(): void {
    this.operators.push(
      this.formBuilder.group({
        name: [''],
        particularOfLicense: [''],
        expirationDate: [''],
      })
    );
  }

  addRadioTransceiverInput(): void {
    this.radioTransceivers.push(
      this.formBuilder.group({
        model: [''],
        serialNumber: [''],
        freqRange: [''],
        powerOutput: [''],
        freqControl: [''],
      })
    );
  }

  submit() {
    this.radioTransceiverService.addOne(this.form.value);
  }

  get operators() {
    return this.form.get('operators') as FormArray;
  }

  get radioTransceivers() {
    return this.form.get('radioTransceivers') as FormArray;
  }
}
