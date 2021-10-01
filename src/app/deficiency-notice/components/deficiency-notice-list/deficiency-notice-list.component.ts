import { Component, Input, OnInit } from '@angular/core';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';

@Component({
  selector: 'app-deficiency-notice-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-deficiency-notice-entry [entry]="entry"></app-deficiency-notice-entry>
    </app-card>
  `,
  styleUrls: ['./deficiency-notice-list.component.css'],
})
export class DeficiencyNoticeListComponent implements OnInit {
  @Input() entries: DeficiencyNotice[];

  constructor() {}

  ngOnInit(): void {}
}
