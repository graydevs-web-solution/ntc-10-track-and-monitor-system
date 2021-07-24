import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ADD, EDIT } from 'src/app/shared/constants';
import { ServiceCenterService } from '../../service-center.service';

@Component({
  selector: 'app-service-center-edit',
  templateUrl: './service-center-edit.component.html',
  styleUrls: ['./service-center-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formMode = ADD;
  formId: string;

  saveServiceCenterSubs: Subscription;
  viewServiceCenterSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private serviceCenterService: ServiceCenterService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.saveServiceCenterSubs = this.serviceCenterService.saveServiceCenterListener.subscribe({
      next: () => {
        this.submit();
      },
    });
    this.viewServiceCenterSubs = this.serviceCenterService.selectedEntry.subscribe({
      next: (value) => {
        this.formMode = EDIT;
        this.formId = value.id;
        this.form.patchValue(value);
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.saveServiceCenterSubs.unsubscribe();
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
    if (this.formMode === ADD) {
      this.serviceCenterService.addOne(this.form.value);
    } else {
      this.serviceCenterService.updateOne(this.formId, this.form.value);
    }
    this.activeModal.close();
  }
}
