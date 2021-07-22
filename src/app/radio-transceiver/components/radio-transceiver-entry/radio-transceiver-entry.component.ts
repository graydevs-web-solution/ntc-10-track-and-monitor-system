import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RadioTransceiver } from '../../models/radio-transceiver.model';

@Component({
  selector: 'app-radio-transceiver-entry',
  template: `
    <a [routerLink]="[entry.id]">
      <div>{{ entry.nameOfStation }}</div>
      <div>
        <small> {{ entry.date | date: "mediumDate" }} </small>
      </div>
    </a>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioTransceiverEntryComponent implements OnInit {
  @Input() entry: RadioTransceiver;
  constructor() { }
  ngOnInit(): void {
  }

}
