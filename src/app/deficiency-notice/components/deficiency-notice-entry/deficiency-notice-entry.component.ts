import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deficiencyNotice, DELETE } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';

@Component({
  selector: 'app-deficiency-notice-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]" class="text-decoration-none">
          <div>{{ entry.docketNumber }}</div>
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
        <button class="btn btn sm btn-primary mr-1" [routerLink]="[entry.id, 'edit']">Edit</button>
        <button class="btn btn sm btn-primary" (click)="open()">Remove</button>
      </div>
    </div>
  `,
  styleUrls: ['./deficiency-notice-entry.component.css'],
})
export class DeficiencyNoticeEntryComponent implements OnInit {
  @Input() entry: DeficiencyNotice;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = deficiencyNotice;
    modalRef.componentInstance.formMode = DELETE;
  }
}
