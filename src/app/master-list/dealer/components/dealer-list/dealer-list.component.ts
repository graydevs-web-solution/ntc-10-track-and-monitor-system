import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Dealer } from '../../models/dealer.model';

@Component({
  selector: 'app-dealer-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-dealer-entry [entry]="entry"></app-dealer-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerListComponent implements OnInit {
  @Input() entries: Dealer[];
  constructor() {}

  ngOnInit(): void {}
}
