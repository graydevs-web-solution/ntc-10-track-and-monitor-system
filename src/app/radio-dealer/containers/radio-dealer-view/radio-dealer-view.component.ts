import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { initForm, supervisingECEInput, techniciansInput } from '../../radio-dealer-shared';
import { RadioDealerService } from '../../radio-dealer.service';

@Component({
  selector: 'app-radio-dealer-view',
  templateUrl: './radio-dealer-view.component.html',
  styleUrls: ['./radio-dealer-view.component.css'],
})
export class RadioDealerViewComponent implements OnInit {
  form: FormGroup;
  formId: string;
  clientName = '';

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(private radioDealerService: RadioDealerService, private route: ActivatedRoute) {}

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
    const fetchedValue = this.radioDealerService.getSelectedEntry(this.formId);
    fetchedValue.supervisingECE.forEach(() => {
      this.addSupervisingECE();
    });
    fetchedValue.radioTechnicians.forEach(() => {
      this.addTechnicians();
    });
    this.clientName = fetchedValue.clientName;
    this.form.patchValue({ ...fetchedValue });
  }

  initForm(): void {
    this.form = initForm(true);
  }

  addSupervisingECE(): void {
    this.supervisingECE.push(supervisingECEInput());
  }

  addTechnicians() {
    this.radioTechnicians.push(techniciansInput());
  }

  generatePdf(): void {
    this.radioDealerService.generatePdf(this.formId);
  }

  get supervisingECE(): FormArray {
    return this.form.get('supervisingECE') as FormArray;
  }

  get radioTechnicians(): FormArray {
    return this.form.get('radioTechnicians') as FormArray;
  }
}