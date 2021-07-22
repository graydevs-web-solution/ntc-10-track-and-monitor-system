import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ServiceCenterReportSummary } from '../../models/service-center-summary.model';

@Component({
  selector: 'app-service-center-report-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-service-center-report-entry [entry]="entry"></app-service-center-report-entry>
    </app-card>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCenterReportListComponent implements OnInit {
  @Input() entries: ServiceCenterReportSummary[];
  constructor() { }

  ngOnInit(): void {
  }

}
