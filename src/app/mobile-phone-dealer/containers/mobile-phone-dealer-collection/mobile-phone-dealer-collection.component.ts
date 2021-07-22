import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MobilePhoneDealerService } from '../../mobile-phone-dealer.service';
import { MobilePhoneDealerSummary } from '../../models/mobile-phone-dealer-summary.model';

@Component({
  selector: 'app-mobile-phone-dealer-collection',
  templateUrl: './mobile-phone-dealer-collection.component.html',
  styleUrls: ['./mobile-phone-dealer-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobilePhoneDealerCollectionComponent implements OnInit {
  entries: MobilePhoneDealerSummary[] = [];

  constructor(private mobilePhoneDealerService: MobilePhoneDealerService) {}

  ngOnInit(): void {
    this.entries = this.mobilePhoneDealerService.getEntries();
  }
}
