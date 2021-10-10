import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { Subscription } from 'rxjs';
import { RadioTransceiver } from '../../models/radio-transceiver.model';
import { LIST } from 'src/app/shared/constants';

@Component({
  selector: 'app-radio-transceiver-collection',
  templateUrl: './radio-transceiver-collection.component.html',
  styleUrls: ['./radio-transceiver-collection.component.css'],
})
export class RadioTransceiverCollectionComponent implements OnInit {
  entries: RadioTransceiver[] = [];
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
    this.radioTransceiverService.getEntriesAPI();
    this.radioTransceiverService.resourceType.next(LIST);
  }
}
