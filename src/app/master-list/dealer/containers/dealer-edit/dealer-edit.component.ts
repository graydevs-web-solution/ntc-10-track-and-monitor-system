import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ADD, EDIT } from 'src/app/shared/constants';
import { DealerService } from '../../dealer.service';

@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formMode = ADD;
  formId: string;

  saveDealerSubs: Subscription;
  viewDealerSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.saveDealerSubs = this.dealerService.saveDealerListener.subscribe({
      next: () => {
        this.submit();
      },
    });
    this.viewDealerSubs = this.dealerService.selectedEntry.subscribe({
      next: (value) => {
        this.formMode = EDIT;
        this.formId = value.id;
        this.form.patchValue(value);
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.saveDealerSubs.unsubscribe();
    this.viewDealerSubs.unsubscribe();
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
    if (this.formMode === ADD) {
      this.dealerService.addOne(this.form.value);
    } else {
      this.dealerService.updateOne(this.formId, this.form.value);
    }
    this.activeModal.close();
  }
}
