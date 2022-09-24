import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageOptions } from 'src/app/shared/models/page-options';

@Component({
  selector: 'app-deficiency-notice-collection',
  templateUrl: './deficiency-notice-collection.component.html',
  styleUrls: ['./deficiency-notice-collection.component.css'],
})
export class DeficiencyNoticeCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: DeficiencyNotice[] = [];
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

  constructor(private dnService: DeficiencyNoticeService) {}

  ngOnInit(): void {
    this.currentPage = this.dnService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.dnService.getEntries();
    this.entriesSubs = this.dnService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.dnService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };
      },
    });
    this.dnService.getEntriesAPI();
    this.dnService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
