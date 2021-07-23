import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { RadioTransceiverSummary } from '../../models/radio-transceiver-summary.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radio-transceiver-collection',
  templateUrl: './radio-transceiver-collection.component.html',
  styleUrls: ['./radio-transceiver-collection.component.css'],
})
export class RadioTransceiverCollectionComponent implements OnInit {
  entries: RadioTransceiverSummary[] = [];
  entriesSubs: Subscription;

  constructor(private radioTransceiverService: RadioTransceiverService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.radioTransceiverService.getEntries();
    this.entriesSubs = this.radioTransceiverService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
      },
    });
  }
}
