import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { initForm } from '../../client-shared';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css'],
})
export class ClientViewComponent implements OnInit, OnDestroy {
  form: FormGroup;

  viewServiceCenterSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viewServiceCenterSubs = this.clientService.selectedEntry.subscribe({
      next: (value) => {
        this.form.patchValue(value);
      },
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.viewServiceCenterSubs.unsubscribe();
  }

  initForm(): void {
    this.form = initForm(true);
  }

  submit(): void {
    this.clientService.addOne(this.form.value);
    this.activeModal.close();
  }
}
