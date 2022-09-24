import { ServiceCenterReportService } from './../../service-center-report.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceCenterReport } from '../../models/service-center-report.model';
import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { PageOptions } from 'src/app/shared/models/page-options';

@Component({
  selector: 'app-service-center-report-collection',
  templateUrl: './service-center-report-collection.component.html',
  styleUrls: ['./service-center-report-collection.component.css'],
})
export class ServiceCenterReportCollectionComponent implements OnInit {
  entries: ServiceCenterReport[];
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

  constructor(private serviceCenterReportService: ServiceCenterReportService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentPage = this.serviceCenterReportService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.serviceCenterReportService.getEntries();
    this.entriesSubs = this.serviceCenterReportService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.serviceCenterReportService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };

        this.cd.detectChanges();
      },
    });
    this.serviceCenterReportService.getEntriesAPI();
    this.serviceCenterReportService.resourceType.next(LIST);
  }
}
