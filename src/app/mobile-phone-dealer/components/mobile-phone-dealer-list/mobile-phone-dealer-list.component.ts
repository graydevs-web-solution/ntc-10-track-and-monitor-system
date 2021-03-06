import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MobilePhoneDealer } from '../../models/mobile-phone-dealer.model';

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
  @Input() entries: MobilePhoneDealer[];

  constructor() {}

  ngOnInit(): void {}
}
