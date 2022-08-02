import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAuthenticated } from 'src/app/auth/model/user-authenticated';
import { deficiencyNotice, DELETE } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';

@Component({
  selector: 'app-deficiency-notice-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]" class="text-decoration-none">
          <div>{{ entry.docketNumberDescription }}</div>
          <div>
            Done?:
            <span
              class="font-weight-bold"
              [ngClass]="{
                'text-success': entry.isDone,
                'text-danger': !entry.isDone
              }"
            >
              {{ entry.isDone ? 'Yes' : 'No' }}</span
            >
          </div>
          <div>
            <small>
              Date Inspected:
              <span class="font-weight-bold">
                {{ entry.date | date: 'mediumDate' }}
              </span>
            </small>
          </div>
        </a>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn sm btn-primary mr-1" *ngIf="enableEdit()" [routerLink]="[entry.id, 'edit']">Edit</button>
        <button class="btn btn sm btn-primary" *ngIf="isRemoveAllowed()" (click)="open()">Remove</button>
      </div>
    </div>
  `,
  styleUrls: ['./deficiency-notice-entry.component.css'],
})
export class DeficiencyNoticeEntryComponent implements OnInit {
  @Input() entry: DeficiencyNotice;
  userInfo: Partial<UserAuthenticated>;
  allowedUser = ['it-admin', 'legal'];

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  enableEdit(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  isRemoveAllowed(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = deficiencyNotice;
    modalRef.componentInstance.formMode = DELETE;
  }
}
