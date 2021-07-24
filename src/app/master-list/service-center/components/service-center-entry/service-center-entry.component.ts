/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DELETE, EDIT, serviceCenterDelete, serviceCenterEdit, serviceCenterView, VIEW } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { ServiceCenter } from '../../models/service-center.model';
import { ServiceCenterService } from '../../service-center.service';

@Component({
  selector: 'app-service-center-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1 cursor" (click)="open()">
        <div>{{ entry.nameOfServiceCenter }}</div>
      </div>
      <div>
        <button class="btn btn sm btn-primary" (click)="open(serviceCenterEdit, EDIT)">Edit</button>
        <button class="btn btn sm btn-primary" (click)="open(serviceCenterDelete, DELETE, entry.id)">Remove</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterEntryComponent implements OnInit {
  @Input() entry: ServiceCenter;

  serviceCenterDelete = serviceCenterDelete;
  serviceCenterEdit = serviceCenterEdit;
  EDIT = EDIT;
  DELETE = DELETE;

  constructor(private serviceCenterService: ServiceCenterService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(componentName = serviceCenterView, formMode = VIEW, formId?: string) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.componentName = componentName;
    modalRef.componentInstance.formMode = formMode;
    modalRef.componentInstance.formId = formId;
    modalRef.shown.subscribe({
      next: () => {
        this.serviceCenterService.selectedEntry.next(this.entry);
      },
    });
  }
}
