import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { PageOptions } from 'src/app/shared/models/page-options';
import { RadioDealer } from '../../models/radio-dealer.model';
import { RadioDealerService } from '../../radio-dealer.service';

@Component({
  selector: 'app-radio-dealer-collection',
  templateUrl: './radio-dealer-collection.component.html',
  styleUrls: ['./radio-dealer-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioDealerCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: RadioDealer[] = [];
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

  constructor(private radioDealerService: RadioDealerService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentPage = this.radioDealerService.getPage();
    this.page = {
      ...this.page,
      pageIndex: this.currentPage.current,
      pageSize: this.currentPage.size,
      collectionSize: this.currentPage.collectionSize,
    };

    this.entries = this.radioDealerService.getEntries();
    this.entriesSubs = this.radioDealerService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;

        this.currentPage = this.radioDealerService.getPage();
        this.page = {
          ...this.page,
          pageIndex: this.currentPage.current,
          pageSize: this.currentPage.size,
          collectionSize: this.currentPage.collectionSize,
        };

        this.cd.detectChanges();
      },
    });
    this.radioDealerService.getEntriesAPI();
    this.radioDealerService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
