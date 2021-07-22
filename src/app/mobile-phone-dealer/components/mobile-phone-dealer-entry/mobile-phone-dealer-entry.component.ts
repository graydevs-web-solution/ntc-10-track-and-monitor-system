import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MobilePhoneDealerSummary } from '../../models/mobile-phone-dealer-summary.model';

@Component({
  selector: 'app-mobile-phone-dealer-entry',
  template: `
    <a [routerLink]="[entry.id]">
      <div>{{ entry.nameOfDealer }}</div>
      <div>
        Approved?:
        <span
          class="font-weight-bold"
          [ngClass]="{
            'text-success': entry.isApproved,
            'text-danger': !entry.isApproved
          }">
            {{ entry.isApproved ? 'Yes' : 'No' }}</span>
      </div>
      <div>
        <small>
          Date Inspected: <span class="font-weight-bold">
            {{ entry.dateInspected | date: "mediumDate" }}
          </span>  </small>
      </div>
    </a>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobilePhoneDealerEntryComponent implements OnInit {
  @Input() entry: MobilePhoneDealerSummary;
  constructor() { }

  ngOnInit(): void {
  }

}
