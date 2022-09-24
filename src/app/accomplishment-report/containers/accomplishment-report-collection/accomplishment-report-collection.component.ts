import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { PageOptions } from 'src/app/shared/models/page-options';
import { AccomplishmentReportService } from '../../accomplishment-report.service';
import { AccomplishmentReport } from '../../models/accomplishment-report.model';

@Component({
  selector: 'app-accomplishment-report-collection',
  templateUrl: './accomplishment-report-collection.component.html',
  styleUrls: ['./accomplishment-report-collection.component.css'],
})
export class AccomplishmentReportCollectionComponent implements OnInit, OnDestroy {
  entries: AccomplishmentReport[] = [];
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

  constructor(private accomplishmentReportService: AccomplishmentReportService) {}

  ngOnInit(): void {
    this.currentPage = this.accomplishmentReportService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.accomplishmentReportService.getEntries();
    this.entriesSubs = this.accomplishmentReportService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.accomplishmentReportService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };
      },
    });
    this.accomplishmentReportService.getEntriesAPI();
    this.accomplishmentReportService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
