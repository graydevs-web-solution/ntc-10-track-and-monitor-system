/* eslint-disable @typescript-eslint/naming-convention */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { dealerDelete, dealerEdit, dealerView, DELETE, EDIT, VIEW } from 'src/app/shared/constants';
import { Dealer } from '../../models/dealer.model';
import { DealerService } from '../../dealer.service';
import { ModalComponent } from 'src/app/ui/modal/modal.component';

@Component({
  selector: 'app-dealer-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1 cursor" (click)="open()">
        <div>{{ entry.nameOfDealer }}</div>
      </div>
      <div>
        <button class="btn btn sm btn-primary" (click)="open(dealerEdit, EDIT)">Edit</button>
        <button class="btn btn sm btn-primary" (click)="open(dealerDelete, DELETE, entry.id)">Remove</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerEntryComponent implements OnInit {
  @Input() entry: Dealer;

  dealerDelete = dealerDelete;
  dealerEdit = dealerEdit;
  EDIT = EDIT;
  DELETE = DELETE;

  constructor(private dealerService: DealerService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(componentName = dealerView, formMode = VIEW, formId?: string) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.componentName = componentName;
    modalRef.componentInstance.formMode = formMode;
    modalRef.componentInstance.formId = formId;
    modalRef.shown.subscribe({
      next: () => {
        this.dealerService.selectedEntry.next(this.entry);
      },
    });
  }
}
