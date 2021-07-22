import { ServiceCenterReportService } from './../../service-center-report.service';
import { Component, OnInit } from '@angular/core';
import { ServiceCenterReportSummary } from '../../models/service-center-summary.model';

@Component({
  selector: 'app-service-center-report-collection',
  templateUrl: './service-center-report-collection.component.html',
  styleUrls: ['./service-center-report-collection.component.css']
})
export class ServiceCenterReportCollectionComponent implements OnInit {
  entries: ServiceCenterReportSummary[];
  constructor(private serviceCenterReportService: ServiceCenterReportService) { }

  ngOnInit(): void {
    this.entries = this.serviceCenterReportService.getEntries();
  }

}
