/* eslint-disable @typescript-eslint/naming-convention */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { clientView, clientDelete, clientEdit, DELETE, EDIT, VIEW } from 'src/app/shared/constants';
import { Client } from '../../models/client.model';
import { ClientService } from '../../client.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';

@Component({
  selector: 'app-client-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1 cursor" (click)="open()">
        <div>{{ entry.name }}</div>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn sm btn-primary mr-1" (click)="open(clientEdit, EDIT)">Edit</button>
        <button class="btn btn sm btn-primary" (click)="open(clientDelete, DELETE, entry.id)">Remove</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEntryComponent implements OnInit {
  @Input() entry: Client;

  clientDelete = clientDelete;
  clientEdit = clientEdit;
  EDIT = EDIT;
  DELETE = DELETE;

  constructor(private clientService: ClientService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(componentName = clientView, formMode = VIEW, formId?: string) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.componentName = componentName;
    modalRef.componentInstance.formMode = formMode;
    modalRef.componentInstance.formId = formId;
    modalRef.shown.subscribe({
      next: () => {
        this.clientService.selectedEntry.next(this.entry);
      },
    });
  }
}
