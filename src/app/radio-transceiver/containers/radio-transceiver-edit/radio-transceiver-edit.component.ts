import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-radio-transceiver-edit',
  templateUrl: './radio-transceiver-edit.component.html',
  styleUrls: ['./radio-transceiver-edit.component.css'],
})
export class RadioTransceiverEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;
  formMode = 'create';

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(private formBuilder: FormBuilder, private radioTransceiverService: RadioTransceiverService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        takeUntil(this.getDestroyed)
      )
      .subscribe({
        next: (value) => {
          this.formId = value;
          this.formMode = value ? 'edit' : 'create';
        },
      });
    if (this.formMode === 'edit') {
      const fetchedValue = this.radioTransceiverService.getSelectedEntry(this.formId);
      const entryDate = new Date(fetchedValue.date).toISOString();
      const formattedDate = DateTime.fromISO(entryDate).toFormat('yyyy-M-d');
      this.form.patchValue({ ...fetchedValue, date: formattedDate });
    }
  }

  ngOnDestroy() {
    this.getDestroyed.next();
    this.getDestroyed.complete();
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
    if (this.formMode === 'create') {
      this.radioTransceiverService.addOne(this.form.value);
    } else {
      this.radioTransceiverService.updateOne(this.formId, this.form.value);
    }
  }

  get operators() {
    return this.form.get('operators') as FormArray;
  }

  get radioTransceivers() {
    return this.form.get('radioTransceivers') as FormArray;
  }
}
