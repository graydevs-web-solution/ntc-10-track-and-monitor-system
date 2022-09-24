import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RadioTransceiverService } from './../../radio-transceiver.service';
import { Subscription } from 'rxjs';
import { RadioTransceiver } from '../../models/radio-transceiver.model';
import { LIST } from 'src/app/shared/constants';
import { PageOptions } from 'src/app/shared/models/page-options';

@Component({
  selector: 'app-radio-transceiver-collection',
  templateUrl: './radio-transceiver-collection.component.html',
  styleUrls: ['./radio-transceiver-collection.component.css'],
})
export class RadioTransceiverCollectionComponent implements OnInit {
  entries: RadioTransceiver[] = [];
  entriesSubs: Subscription;
  page = {
    collectionSize: 0,
    pageIndex: 1,
    pageSize: 5,
    rotate: true,
    ellipses: false,
    boundaryLinks: true,
  };
  currentPage: PageOptions;

  constructor(private radioTransceiverService: RadioTransceiverService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentPage = this.radioTransceiverService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.radioTransceiverService.getEntries();
    this.entriesSubs = this.radioTransceiverService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.radioTransceiverService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };

        this.cd.detectChanges();
      },
    });
    this.radioTransceiverService.getEntriesAPI();
    this.radioTransceiverService.resourceType.next(LIST);
  }
}
