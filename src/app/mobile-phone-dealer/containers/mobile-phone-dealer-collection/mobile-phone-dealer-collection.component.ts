import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MobilePhoneDealerService } from '../../mobile-phone-dealer.service';
import { MobilePhoneDealerSummary } from '../../models/mobile-phone-dealer-summary.model';

@Component({
  selector: 'app-mobile-phone-dealer-collection',
  templateUrl: './mobile-phone-dealer-collection.component.html',
  styleUrls: ['./mobile-phone-dealer-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobilePhoneDealerCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: MobilePhoneDealerSummary[] = [];
  entriesSubs: Subscription;

  constructor(private mobilePhoneDealerService: MobilePhoneDealerService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.mobilePhoneDealerService.getEntries();
    this.entriesSubs = this.mobilePhoneDealerService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
