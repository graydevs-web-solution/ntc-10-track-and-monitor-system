import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RadioTransceiver } from '../../models/radio-transceiver.model';

@Component({
  selector: 'app-radio-transceiver-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-radio-transceiver-entry [entry]="entry"></app-radio-transceiver-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioTransceiverListComponent implements OnInit {
  @Input() entries: RadioTransceiver[];
  constructor() {}

  ngOnInit(): void {}
}
