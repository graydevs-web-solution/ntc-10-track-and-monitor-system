import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DELETE, radioDealer } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { RadioDealer } from '../../models/radio-dealer.model';

@Component({
  selector: 'app-radio-dealer-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]" class="text-decoration-none">
          <div>{{ entry.clientName }}</div>
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
        <button class="btn btn-sm btn-primary mr-1" [routerLink]="[entry.id, 'edit']">Edit</button>
        <button class="btn btn-sm btn-primary" (click)="open()">Remove</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioDealerEntryComponent implements OnInit {
  @Input() entry: RadioDealer;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = radioDealer;
    modalRef.componentInstance.formMode = DELETE;
  }
}
