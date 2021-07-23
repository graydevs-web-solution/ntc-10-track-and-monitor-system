import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RadioTransceiver } from '../../models/radio-transceiver.model';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { DELETE, radioTransceiver } from 'src/app/shared/constants';

@Component({
  selector: 'app-radio-transceiver-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]">
          <div>{{ entry.nameOfStation }}</div>
          <div>
            <small> {{ entry.date | date: 'mediumDate' }} </small>
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
export class RadioTransceiverEntryComponent implements OnInit {
  @Input() entry: RadioTransceiver;
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = radioTransceiver;
    modalRef.componentInstance.formMode = DELETE;
  }
}
