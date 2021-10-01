import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { initForm, transmitterInput } from '../../deficiency-notice-shared';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';

interface ViolationsType {
  name: string;
  formControlName: string;
}

@Component({
  selector: 'app-deficiency-notice-edit',
  templateUrl: './deficiency-notice-edit.component.html',
  styleUrls: ['./deficiency-notice-edit.component.css'],
})
export class DeficiencyNoticeEditComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  violations: ViolationsType[] = [
    { name: 'Operation without Radio Station license/temporary permit.', formControlName: 'operationWithoutRSL' },
    { name: 'Operation without licensed radio operator.', formControlName: 'operationWithoutLRO' },
    { name: 'Operating on unauthorized frequency.', formControlName: 'operationUnauthorizedFrequency' },
    {
      name: 'Possession of transmitter/transceiver without permit to purchased/possess.',
      formControlName: 'possessionTransmitterWithoutPP',
    },
    {
      name: 'No NTC pertinent papers presented at the time of inspection of the units/s mentioned.',
      formControlName: 'noNTCPertinentPapers',
    },
  ];

  constructor(
    private dnService: DeficiencyNoticeService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private modalService: NgbModal
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
      },
    });

    if (this.formMode === EDIT) {
      const fetchedValue = this.dnService.getSelectedEntry(this.formId);
      fetchedValue.transmitters.forEach(() => {
        this.addTransmitterInput();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({ ...fetchedValue });
      this.dnService.resourceType.next(EDIT);
    } else {
      this.dnService.resourceType.next(ADD);
    }
  }

  initForm(): void {
    this.form = initForm();
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  addTransmitterInput() {
    this.transmitters.push(transmitterInput());
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.dnService
        .addOne(this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (res) => {
            console.log('OK');
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.dnService
        .updateOne(this.formId, this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (res) => {
            console.log('OK');
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }
}
