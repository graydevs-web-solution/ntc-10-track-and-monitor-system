import { Component, Input, OnInit } from '@angular/core';
import { AccomplishmentReport } from '../../models/accomplishment-report.model';

@Component({
  selector: 'app-accomplishment-report-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-accomplishment-report-entry [entry]="entry"></app-accomplishment-report-entry>
    </app-card>
  `,
  styleUrls: ['./accomplishment-report-list.component.css'],
})
export class AccomplishmentReportListComponent implements OnInit {
  @Input() entries: AccomplishmentReport[];

  constructor() {}

  ngOnInit(): void {}
}
