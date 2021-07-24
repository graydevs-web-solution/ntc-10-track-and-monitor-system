import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DealerService } from '../../dealer.service';

@Component({
  selector: 'app-dealer-view',
  templateUrl: './dealer-view.component.html',
  styleUrls: ['./dealer-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerViewComponent implements OnInit, OnDestroy {
  form: FormGroup;

  viewServiceCenterSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viewServiceCenterSubs = this.dealerService.selectedEntry.subscribe({
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
      nameOfDealer: [''],
      businessAddress: [''],
      cellphoneNumber: [''],
      faxNumber: [''],
      addressOfMobilePhoneWarehouse: [''],
      mobilePhoneDealerInfo: this.fb.group({
        permitNumber: [''],
        expiryDate: [''],
      }),
      secDtiRegistrationNumber: [''],
      businessMayorPermitNumber: [''],
    });
  }

  submit(): void {
    this.dealerService.addOne(this.form.value);
    this.activeModal.close();
  }
}
