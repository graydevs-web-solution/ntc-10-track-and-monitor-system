import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ADD, EDIT } from 'src/app/shared/constants';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formMode = ADD;
  formId: string;

  saveClientSubs: Subscription;
  viewClientSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.saveClientSubs = this.clientService.saveClientListener.subscribe({
      next: () => {
        console.log('fired');
        this.submit();
      },
    });
    this.viewClientSubs = this.clientService.selectedEntry.subscribe({
      next: (value) => {
        this.formMode = EDIT;
        this.formId = value.id;
        this.form.patchValue(value);
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.saveClientSubs.unsubscribe();
    this.viewClientSubs.unsubscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [''],
      businessAddress: [''],
      cellphoneNumber: [''],
      faxNumber: [''],
      exactLocation: [''],
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
    });
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.clientService.addOne(this.form.value).subscribe({
        next: (res) => {
          this.clientService.getEntriesAPI();
        },
      });
    } else {
      this.clientService.updateOne(this.formId, this.form.value);
    }
    this.activeModal.close();
  }
}
