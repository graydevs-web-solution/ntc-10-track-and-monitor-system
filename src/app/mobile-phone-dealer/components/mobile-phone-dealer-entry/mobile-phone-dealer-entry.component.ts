import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DELETE, mobilePhoneDealer } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { MobilePhoneDealer } from '../../models/mobile-phone-dealer.model';

@Component({
  selector: 'app-mobile-phone-dealer-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]">
          <div>{{ entry.clientName }}</div>
          <div>
            Approved?:
            <span
              class="font-weight-bold"
              [ngClass]="{
                'text-success': entry.isApproved,
                'text-danger': !entry.isApproved
              }"
            >
              {{ entry.isApproved ? 'Yes' : 'No' }}</span
            >
          </div>
          <div>
            <small>
              Date Inspected:
              <span class="font-weight-bold">
                {{ entry.dateInspected | date: 'mediumDate' }}
              </span>
            </small>
          </div>
        </a>
      </div>
      <div>
        <button class="btn btn sm btn-primary" [routerLink]="[entry.id, 'edit']">Edit</button>
        <button class="btn btn sm btn-primary" (click)="open()">Remove</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobilePhoneDealerEntryComponent implements OnInit {
  @Input() entry: MobilePhoneDealer;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = mobilePhoneDealer;
    modalRef.componentInstance.formMode = DELETE;
  }
}
