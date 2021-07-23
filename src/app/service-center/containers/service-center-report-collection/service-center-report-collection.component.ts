import { ServiceCenterReportService } from './../../service-center-report.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceCenterReportSummary } from '../../models/service-center-summary.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-center-report-collection',
  templateUrl: './service-center-report-collection.component.html',
  styleUrls: ['./service-center-report-collection.component.css'],
})
export class ServiceCenterReportCollectionComponent implements OnInit {
  entries: ServiceCenterReportSummary[];
  entriesSubs: Subscription;
  constructor(private serviceCenterReportService: ServiceCenterReportService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.serviceCenterReportService.getEntries();
    this.entriesSubs = this.serviceCenterReportService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
      },
    });
  }
}
