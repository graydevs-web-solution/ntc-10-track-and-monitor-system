import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MobilePhoneDealerSummary } from '../../models/mobile-phone-dealer-summary.model';

@Component({
  selector: 'app-mobile-phone-dealer-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-mobile-phone-dealer-entry [entry]="entry"></app-mobile-phone-dealer-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobilePhoneDealerListComponent implements OnInit {
  @Input() entries: MobilePhoneDealerSummary[];

  constructor() {}

  ngOnInit(): void {}
}
