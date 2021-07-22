import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RadioTransceiverSummary } from './../../models/radio-transceiver-summary.model';

@Component({
  selector: 'app-radio-transceiver-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-radio-transceiver-entry [entry]="entry"></app-radio-transceiver-entry>
    </app-card>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioTransceiverListComponent implements OnInit {
  @Input() entries: RadioTransceiverSummary[];
  constructor() { }

  ngOnInit(): void {
  }

}
