import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ServiceCenterService } from '../../service-center.service';

@Component({
  selector: 'app-service-center-view',
  templateUrl: './service-center-view.component.html',
  styleUrls: ['./service-center-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterViewComponent implements OnInit, OnDestroy {
  form: FormGroup;

  viewServiceCenterSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private serviceCenterService: ServiceCenterService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viewServiceCenterSubs = this.serviceCenterService.selectedEntry.subscribe({
      next: (value) => {
        this.form.patchValue(value);
        this.cd.detectChanges();
      },
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.viewServiceCenterSubs.unsubscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
      nameOfServiceCenter: [''],
      businessAddress: [''],
      cellphoneNumber: [''],
      faxNumber: [''],
      exactLocationOfServiceCenter: [''],
      mpscInfo: this.fb.group({
        permitNumber: [''],
        expiryDate: [''],
      }),
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
    });
  }

  submit(): void {
    this.serviceCenterService.addOne(this.form.value);
    this.activeModal.close();
  }
}
