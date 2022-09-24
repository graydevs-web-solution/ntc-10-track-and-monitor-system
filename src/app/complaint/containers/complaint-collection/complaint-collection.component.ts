import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { PageOptions } from 'src/app/shared/models/page-options';
import { ComplaintService } from '../../complaint.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-collection',
  templateUrl: './complaint-collection.component.html',
  styleUrls: ['./complaint-collection.component.css'],
})
export class ComplaintCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: Complaint[] = [];
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

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.currentPage = this.complaintService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.complaintService.getEntries();
    this.entriesSubs = this.complaintService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.complaintService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };
      },
    });
    this.complaintService.getEntriesAPI();
    this.complaintService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
