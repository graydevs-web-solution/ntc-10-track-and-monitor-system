import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ServiceCenterReportSummary } from '../../models/service-center-summary.model';

@Component({
  selector: 'app-service-center-report-entry',
  template: `
    <a [routerLink]="[entry.id]">
      <div>{{ entry.nameOfServiceCenter }}</div>
      <div>
        Approved?:
        <span
          class="font-weight-bold"
          [ngClass]="{
            'text-success': entry.isApproved,
            'text-danger': !entry.isApproved
          }"
        >
          {{ entry.isApproved ? 'Yes' : 'No' }}</span
        >
      </div>
      <div>
        <small>
          Date Inspected:
          <span class="font-weight-bold">
            {{ entry.dateInspected | date: 'mediumDate' }}
          </span>
        </small>
      </div>
    </a>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterReportEntryComponent implements OnInit {
  @Input() entry: ServiceCenterReportSummary;
  constructor() {}

  ngOnInit(): void {}
}
