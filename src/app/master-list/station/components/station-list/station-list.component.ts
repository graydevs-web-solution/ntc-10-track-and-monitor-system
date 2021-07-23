import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-station-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-station-entry [entry]="entry"></app-station-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationListComponent implements OnInit {
  @Input() entries: Station[];
  constructor() {}

  ngOnInit(): void {}
}
