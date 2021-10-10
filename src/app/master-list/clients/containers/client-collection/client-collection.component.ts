import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { clientEdit, EDIT } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { ClientService } from '../../client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-collection',
  templateUrl: './client-collection.component.html',
  styleUrls: ['./client-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCollectionComponent implements OnInit, OnDestroy {
  entries: Client[] = [];
  entriesSubs: Subscription;
  constructor(private modalService: NgbModal, private clientService: ClientService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.clientService.getEntries();
    this.entriesSubs = this.clientService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
      },
    });
    if (!this.entries.length) {
      this.clientService.getEntriesAPI();
    }
  }

  ngOnDestroy(): void {
    this.entriesSubs.unsubscribe();
  }
}
