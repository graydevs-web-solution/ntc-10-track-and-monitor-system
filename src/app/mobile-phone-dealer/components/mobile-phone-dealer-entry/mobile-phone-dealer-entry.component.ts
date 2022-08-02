import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAuthenticated } from 'src/app/auth/model/user-authenticated';
import { DELETE, mobilePhoneDealer } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { MobilePhoneDealer } from '../../models/mobile-phone-dealer.model';

@Component({
  selector: 'app-mobile-phone-dealer-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]" class="text-decoration-none">
          <div>{{ entry.clientName }}</div>
          <div>
            Approved?:
            <span
              class="font-weight-bold"
              [ngClass]="{
                'text-success': entry.regionalDirectorApproved,
                'text-danger': !entry.regionalDirectorApproved
              }"
            >
              {{ entry.regionalDirectorApproved ? 'Yes' : 'No' }}</span
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
      <div class="d-flex align-items-center">
        <button class="btn btn sm btn-primary mr-1" *ngIf="enableEdit()" [routerLink]="[entry.id, 'edit']">Edit</button>
        <button class="btn btn sm btn-primary" *ngIf="enableRemove()" (click)="open()">Remove</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobilePhoneDealerEntryComponent implements OnInit {
  @Input() entry: MobilePhoneDealer;
  userInfo: Partial<UserAuthenticated>;
  allowedUser = ['it-admin', 'chf-engr', 'director'];
  constructor(private modalService: NgbModal, private authService: AuthService) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = mobilePhoneDealer;
    modalRef.componentInstance.formMode = DELETE;
  }

  enableEdit(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  enableRemove(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }
}
