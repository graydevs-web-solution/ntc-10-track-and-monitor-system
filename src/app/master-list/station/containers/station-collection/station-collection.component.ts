import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EDIT, stationEdit } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { Station } from '../../models/station.model';
import { StationService } from './../../station.service';

@Component({
  selector: 'app-station-collection',
  templateUrl: './station-collection.component.html',
  styleUrls: ['./station-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationCollectionComponent implements OnInit, OnDestroy {
  entries: Station[] = [];
  entriesSubs: Subscription;
  constructor(private modalService: NgbModal, private stationService: StationService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.stationService.getEntries();
    this.entriesSubs = this.stationService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.entriesSubs.unsubscribe();
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.componentName = stationEdit;
    modalRef.componentInstance.formMode = EDIT;
  }
}
