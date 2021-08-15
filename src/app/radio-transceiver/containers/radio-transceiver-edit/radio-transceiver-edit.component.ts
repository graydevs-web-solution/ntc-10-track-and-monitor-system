import { ActivatedRoute, Params } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { operatorInput, radioTransceiverEntryInput, initForm } from '../../radio-transceiver-shared';

@Component({
  selector: 'app-radio-transceiver-edit',
  templateUrl: './radio-transceiver-edit.component.html',
  styleUrls: ['./radio-transceiver-edit.component.css'],
})
export class RadioTransceiverEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private radioTransceiverService: RadioTransceiverService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private clientService: ClientService,
    private cd: ChangeDetectorRef
  ) {}

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
          this.formMode = value ? EDIT : ADD;
        },
      });

    this.clientService.selectedEntry.pipe(takeUntil(this.getDestroyed)).subscribe({
      next: (response) => {
        this.form.patchValue({ clientId: response.id });
        this.clientName = response.name;
        this.cd.detectChanges();
      },
    });

    if (this.formMode === EDIT) {
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
  }

  ngOnDestroy() {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  initForm() {
    this.form = initForm();
  }

  addOperatorInput(): void {
    this.operators.push(operatorInput);
  }

  addRadioTransceiverInput(): void {
    this.radioTransceivers.push(radioTransceiverEntryInput);
  }

  submit() {
    if (this.formMode === ADD) {
      this.radioTransceiverService
        .addOne(this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (response) => {
            //
          },
        });
    } else {
      this.radioTransceiverService
        .updateOne(this.formId, this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (response) => {
            //
          },
        });
    }
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  get operators() {
    return this.form.get('operators') as FormArray;
  }

  get radioTransceivers() {
    return this.form.get('radioTransceivers') as FormArray;
  }
}
