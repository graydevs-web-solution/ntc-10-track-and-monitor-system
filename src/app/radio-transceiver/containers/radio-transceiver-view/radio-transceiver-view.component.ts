import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RadioTransceiverService } from './../../radio-transceiver.service';

@Component({
  selector: 'app-radio-transceiver-view',
  templateUrl: './radio-transceiver-view.component.html',
  styleUrls: ['./radio-transceiver-view.component.css']
})
export class RadioTransceiverViewComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;

  getDestroyed = new Subject();

  faCalendarAlt = faCalendarAlt;

  constructor(private formBuilder: FormBuilder,
    private radioTransceiverService: RadioTransceiverService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.pipe(
      map((params: Params) => params.id),
      takeUntil(this.getDestroyed))
      .subscribe({ next: (value => {
        this.formId = value;
      }) });

      this.form.patchValue(this.radioTransceiverService.getSelectedEntry(this.formId));
  }

  ngOnDestroy(): void {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group(
      {
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
          dateIssued: ['']
        }),
        cpInfo: this.formBuilder.group({
          cpNumber: [''],
          expirationDate: [''],
        }),
        licInfo: this.formBuilder.group({
          licNumber: [''],
          expirationDate: ['']
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
          ah: ['']
        }),
        illegalConstructionInfo: this.formBuilder.group({
          constructionsOfRadioStationsWithoutConstructionPermit: [false],
          illegalTransfer: [false]
        }),
        illegalOperationInfo: this.formBuilder.group({
          operationWithoutRadioStationLicensePermit: [false],
          operationWithoutLicenseRadioOperator: [false],
          operationWithoutLogbook: [false],
          operatingOnUnauthorizedFrequency: [false]
        }),
        illegalPossession: [false],
        others: [''],
        radioRegulationInspector: [''],
        authorizedRepresentative: [''],
        regionalDirector: ['']
      }
    );
  }

  addOperatorInput(): void {
    this.operators.push(this.formBuilder.group({
      name: [''],
      particularOfLicense: [''],
      expirationDate: ['']
    }));
  }

  addRadioTransceiverInput(): void {
    this.radioTransceivers.push(this.formBuilder.group({
      model: [''],
      serialNumber: [''],
      freqRange: [''],
      powerOutput: [''],
      freqControl: ['']
    }));
  }

  get operators() {
    return this.form.get('operators') as FormArray;
  }

  get radioTransceivers() {
    return this.form.get('radioTransceivers') as FormArray;
  }

}
