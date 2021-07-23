/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stationView, stationEdit, EDIT, DELETE, VIEW, stationDelete } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { Station } from '../../models/station.model';
import { StationService } from '../../station.service';

@Component({
  selector: 'app-station-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1 cursor" (click)="open()">
        <div>{{ entry.nameOfStation }}</div>
      </div>
      <div>
        <button class="btn btn sm btn-primary" (click)="open(stationEdit, EDIT)">Edit</button>
        <button class="btn btn sm btn-primary" (click)="open(stationDelete, DELETE, entry.id)">Remove</button>
      </div>
    </div>
  `,
  styles: ['.cursor { cursor: pointer }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationEntryComponent implements OnInit {
  @Input() entry: Station;

  stationDelete = stationDelete;
  stationEdit = stationEdit;
  EDIT = EDIT;
  DELETE = DELETE;

  constructor(private stationService: StationService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(componentName = stationView, formMode = VIEW, formId?: string) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.componentName = componentName;
    modalRef.componentInstance.formMode = formMode;
    modalRef.componentInstance.formId = formId;
    modalRef.shown.subscribe({
      next: () => {
        this.stationService.selectedEntry.next(this.entry);
      },
    });
  }
}
