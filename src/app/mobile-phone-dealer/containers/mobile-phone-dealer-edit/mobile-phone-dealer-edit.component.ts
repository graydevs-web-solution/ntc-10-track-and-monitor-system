import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT, userSearch } from 'src/app/shared/constants';
import { formatName } from 'src/app/shared/utility';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
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
  regDirectorInfo = {
    ['user_id']: '',
    name: '',
  };
  notedByInfo = {
    ['user_id']: '',
    name: '',
  };
  userSelectSub: Subscription;
  userInfo = this.authService.getUserInfo();

  formatName = formatName;
  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private mobilePhoneDealerService: MobilePhoneDealerService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private authService: AuthService,
    private systemService: SystemSettingService
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
        this.clientName = response.businessName;
        this.cd.detectChanges();
      },
    });

    this.userSelectSub = this.authService.selectedEntryUser.subscribe({
      next: (res) => {
        const data: UserAssignedData = { ['user_id']: res.user_id, name: this.formatName(res), position: res.position };
        this.notedByInfo = { ['user_id']: data.user_id, name: data.name };
        this.form.patchValue({ notedBy: data.user_id });
        console.log(this.notedByInfo);
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
      console.log(fetchedValue);
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({
        ...fetchedValue,
        notedBy: fetchedValue.notedByInfo.user_id,
        regionalDirector: fetchedValue.regionalDirectorInfo.user_id,
      });
      this.regDirectorInfo = {
        name: fetchedValue.regionalDirectorInfo.name,
        ['user_id']: fetchedValue.regionalDirectorInfo.user_id,
      };
      this.notedByInfo = {
        name: fetchedValue.notedByInfo.name,
        ['user_id']: fetchedValue.notedByInfo.user_id,
      };
      this.mobilePhoneDealerService.resourceType.next(EDIT);
    } else {
      this.regDirectorInfo = this.systemService.getRegionalDirectorInfo();
      this.notedByInfo = this.systemService.getNotedByInfo();
      this.form.patchValue({ regionalDirector: this.regDirectorInfo.user_id, notedBy: this.notedByInfo.user_id });
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

  open(userType: 'client' | 'user'): void {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    if (userType === 'client') {
      modalRef.componentInstance.componentName = clientSearch;
      return;
    }
    modalRef.componentInstance.componentName = userSearch;
  }

  get approveStatus(): string {
    const approved = this.form.get('isApproved').value;

    if (approved === null) {
      return `Undecided`;
    }

    if (approved) {
      return `Approved`;
    } else {
      return `Disapproved`;
    }
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
