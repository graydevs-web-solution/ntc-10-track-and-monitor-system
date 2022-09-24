import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { clientEdit, EDIT } from 'src/app/shared/constants';
import { PageOptions } from 'src/app/shared/models/page-options';
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
  page = {
    collectionSize: 0,
    pageIndex: 1,
    pageSize: 5,
    rotate: true,
    ellipses: false,
    boundaryLinks: true,
  };
  currentPage: PageOptions;

  constructor(private modalService: NgbModal, private clientService: ClientService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentPage = this.clientService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.clientService.getEntries();
    this.entriesSubs = this.clientService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.clientService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };

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
