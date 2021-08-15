import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { operatorInput, radioTransceiverEntryInput, initForm } from '../../radio-transceiver-shared';

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
    fetchedValue.operators.forEach(() => {
      this.addOperatorInput();
    });
    fetchedValue.radioTransceivers.forEach(() => {
      this.addRadioTransceiverInput();
    });
    this.clientName = fetchedValue.clientName;
    this.form.patchValue({ ...fetchedValue });
  }

  ngOnDestroy(): void {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm(): void {
    this.form = initForm(true);
  }

  addOperatorInput(): void {
    this.operators.push(operatorInput);
  }

  addRadioTransceiverInput(): void {
    this.radioTransceivers.push(radioTransceiverEntryInput);
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
}
