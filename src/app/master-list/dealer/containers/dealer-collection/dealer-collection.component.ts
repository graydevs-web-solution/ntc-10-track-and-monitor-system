import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { dealerEdit, EDIT } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { DealerService } from '../../dealer.service';
import { Dealer } from '../../models/dealer.model';

@Component({
  selector: 'app-dealer-collection',
  templateUrl: './dealer-collection.component.html',
  styleUrls: ['./dealer-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerCollectionComponent implements OnInit, OnDestroy {
  entries: Dealer[] = [];
  entriesSubs: Subscription;
  constructor(private modalService: NgbModal, private dealerService: DealerService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.dealerService.getEntries();
    this.entriesSubs = this.dealerService.getEntriesListener().subscribe({
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
    modalRef.componentInstance.componentName = dealerEdit;
    modalRef.componentInstance.formMode = EDIT;
  }
}
