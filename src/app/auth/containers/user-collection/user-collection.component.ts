import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { AuthService } from '../../auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css'],
})
export class UserCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: User[] = [];
  entriesSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.entries = this.authService.getEntries();
    this.entriesSubs = this.authService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
      },
    });
    this.authService.getEntriesAPI();
    this.authService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
