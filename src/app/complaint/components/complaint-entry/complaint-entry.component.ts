import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAuthenticated } from 'src/app/auth/model/user-authenticated';
import { complaint, DELETE } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-entry',
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
                {{ entry.dateOfInspection | date: 'mediumDate' }}
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
  styleUrls: ['./complaint-entry.component.css'],
})
export class ComplaintEntryComponent implements OnInit {
  @Input() entry: Complaint;
  userInfo: Partial<UserAuthenticated>;
  allowedUser = ['it-admin', 'legal'];

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = complaint;
    modalRef.componentInstance.formMode = DELETE;
  }

  enableEdit(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  enableRemove(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }
}
