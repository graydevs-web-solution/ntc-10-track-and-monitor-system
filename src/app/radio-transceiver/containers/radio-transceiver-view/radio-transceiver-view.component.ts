import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { operatorInput, radioTransceiverEntryInput, initForm, receiverOrOtherEquipmentInput } from '../../radio-transceiver-shared';
import { VIEW } from 'src/app/shared/constants';
import { isArrayValue } from 'src/app/shared/utility';

@Component({
  selector: 'app-radio-transceiver-view',
  templateUrl: './radio-transceiver-view.component.html',
  styleUrls: ['./radio-transceiver-view.component.css'],
})
export class RadioTransceiverViewComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;
  clientName = '';

  getDestroyed = new Subject();

  faCalendarAlt = faCalendarAlt;
  faFilePdf = faFilePdf;

  constructor(private radioTransceiverService: RadioTransceiverService, private route: ActivatedRoute) {}

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
        },
      });
    const fetchedValue = this.radioTransceiverService.getSelectedEntry(this.formId);
    for (const _ of isArrayValue(fetchedValue.operators)) {
      this.addOperatorInput();
    }
    for (const _ of isArrayValue(fetchedValue.radioTransceivers)) {
      this.addRadioTransceiverInput();
    }
    for (const _ of isArrayValue(fetchedValue.receivers)) {
      this.addReceiver();
    }
    for (const _ of isArrayValue(fetchedValue.otherEquipments)) {
      this.addOtherEquipment();
    }
    this.clientName = fetchedValue.clientName;
    this.form.patchValue({ ...fetchedValue });
    this.radioTransceiverService.resourceType.next(VIEW);
  }

  ngOnDestroy(): void {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm(): void {
    this.form = initForm(true);
  }

  addOperatorInput(): void {
    this.operators.push(operatorInput());
  }

  addRadioTransceiverInput(): void {
    this.radioTransceivers.push(radioTransceiverEntryInput());
  }

  addReceiver() {
    this.receivers.push(receiverOrOtherEquipmentInput());
  }

  addOtherEquipment() {
    this.otherEquipments.push(receiverOrOtherEquipmentInput());
  }

  generatePdf(): void {
    this.radioTransceiverService.generatePdf(this.formId);
  }

  get operators() {
    return this.form.get('operators') as FormArray;
  }

  get radioTransceivers() {
    return this.form.get('radioTransceivers') as FormArray;
  }

  get receivers() {
    return this.form.get('receivers') as FormArray;
  }

  get otherEquipments() {
    return this.form.get('otherEquipments') as FormArray;
  }
}
