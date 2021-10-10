import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
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

  constructor(private radioDealerService: RadioDealerService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.radioDealerService.getEntries();
    this.entriesSubs = this.radioDealerService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
        console.log(value);
      },
    });
    this.radioDealerService.getEntriesAPI();
    this.radioDealerService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
