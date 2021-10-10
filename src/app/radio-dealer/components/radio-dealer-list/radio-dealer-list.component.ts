import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RadioDealer } from '../../models/radio-dealer.model';

@Component({
  selector: 'app-radio-dealer-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-radio-dealer-entry [entry]="entry"></app-radio-dealer-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioDealerListComponent implements OnInit {
  @Input() entries: RadioDealer[];

  constructor() {}

  ngOnInit(): void {}
}
