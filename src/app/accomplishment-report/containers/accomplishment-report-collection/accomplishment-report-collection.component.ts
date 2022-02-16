import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
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

  constructor(private accomplishmentReportService: AccomplishmentReportService) {}

  ngOnInit(): void {
    this.entries = this.accomplishmentReportService.getEntries();
    this.entriesSubs = this.accomplishmentReportService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
      },
    });
    this.accomplishmentReportService.getEntriesAPI();
    this.accomplishmentReportService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
