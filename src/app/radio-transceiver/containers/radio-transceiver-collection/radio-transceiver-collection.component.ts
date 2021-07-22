import { Component, OnInit } from '@angular/core';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { RadioTransceiverSummary } from '../../models/radio-transceiver-summary.model';

@Component({
  selector: 'app-radio-transceiver-collection',
  templateUrl: './radio-transceiver-collection.component.html',
  styleUrls: ['./radio-transceiver-collection.component.css']
})
export class RadioTransceiverCollectionComponent implements OnInit {
  entries: RadioTransceiverSummary[] = [];

  constructor(private radioTransceiverService: RadioTransceiverService) { }

  ngOnInit(): void {
    this.entries = this.radioTransceiverService.getEntries();
  }

}
