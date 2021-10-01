import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { initForm, stockMobilePhoneInput, stockSIMInput, stockSpareAndAccessoryInput } from '../../mobile-phone-dealer-shared';
import { MobilePhoneDealerService } from '../../mobile-phone-dealer.service';

@Component({
  selector: 'app-mobile-phone-dealer-edit',
  templateUrl: './mobile-phone-dealer-edit.component.html',
  styleUrls: ['./mobile-phone-dealer-edit.component.css'],
})
export class MobilePhoneDealerEditComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private mobilePhoneDealerService: MobilePhoneDealerService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
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
        this.cd.detectChanges();
      },
    });

    if (this.formMode === EDIT) {
      const fetchedValue = this.mobilePhoneDealerService.getSelectedEntry(this.formId);
      fetchedValue.listOfStocksOfSparesAndAccessories.forEach(() => {
        this.addStockSpareAndAccessory();
      });
      fetchedValue.listOfStocksOfMobilePhone.forEach(() => {
        this.addStockMobilePhone();
      });
      fetchedValue.listOfStocksOfSubscriberIdentificationModule.forEach(() => {
        this.addStockSIM();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({ ...fetchedValue });
      this.mobilePhoneDealerService.resourceType.next(EDIT);
    } else {
      this.mobilePhoneDealerService.resourceType.next(ADD);
    }
  }

  initForm(): void {
    this.form = initForm();
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.mobilePhoneDealerService
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
      this.mobilePhoneDealerService
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

  addStockSpareAndAccessory(): void {
    this.listOfStocksOfSparesAndAccessories.push(stockSpareAndAccessoryInput());
  }

  addStockMobilePhone() {
    this.listOfStocksOfMobilePhone.push(stockMobilePhoneInput());
  }

  addStockSIM() {
    this.listOfStocksOfSubscriberIdentificationModule.push(stockSIMInput());
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  get listOfStocksOfSparesAndAccessories(): FormArray {
    return this.form.get('listOfStocksOfSparesAndAccessories') as FormArray;
  }

  get listOfStocksOfMobilePhone(): FormArray {
    return this.form.get('listOfStocksOfMobilePhone') as FormArray;
  }

  get listOfStocksOfSubscriberIdentificationModule(): FormArray {
    return this.form.get('listOfStocksOfSubscriberIdentificationModule') as FormArray;
  }
}
