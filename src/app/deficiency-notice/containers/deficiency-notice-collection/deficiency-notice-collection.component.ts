import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-deficiency-notice-collection',
  templateUrl: './deficiency-notice-collection.component.html',
  styleUrls: ['./deficiency-notice-collection.component.css'],
})
export class DeficiencyNoticeCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: DeficiencyNotice[] = [];
  entriesSubs: Subscription;

  constructor(private dnService: DeficiencyNoticeService) {}

  ngOnInit(): void {
    this.entries = this.dnService.getEntries();
    this.entriesSubs = this.dnService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
      },
    });
    this.dnService.getEntriesAPI();
    this.dnService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
