import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RadioTransceiver } from '../../models/radio-transceiver.model';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { DELETE, radioTransceiver } from 'src/app/shared/constants';
import { Client } from 'src/app/master-list/clients/models/client.model';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAuthenticated } from 'src/app/auth/model/user-authenticated';

@Component({
  selector: 'app-radio-transceiver-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]" class="text-decoration-none">
          <div>{{ entry.clientName }}</div>
          <div>
            <small> {{ entry.dateIssued | date: 'mediumDate' }} </small>
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
export class RadioTransceiverEntryComponent implements OnInit {
  @Input() entry: RadioTransceiver;
  userInfo: Partial<UserAuthenticated>;
  allowedUser = ['it-admin', 'chf-engr', 'director'];
  constructor(private modalService: NgbModal, private authService: AuthService) {}
  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  enableEdit(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  enableRemove(): boolean {
    return this.allowedUser.includes(this.userInfo.position);
  }

  // clientName = (client: RadioTransceiver): string => {
  //   return (client.clientId as Client).name;
  // };

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = radioTransceiver;
    modalRef.componentInstance.formMode = DELETE;
  }
}
