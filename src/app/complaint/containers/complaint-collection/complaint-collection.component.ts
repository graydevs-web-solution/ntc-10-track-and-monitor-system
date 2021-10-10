import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LIST } from 'src/app/shared/constants';
import { ComplaintService } from '../../complaint.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-collection',
  templateUrl: './complaint-collection.component.html',
  styleUrls: ['./complaint-collection.component.css'],
})
export class ComplaintCollectionComponent implements OnInit, OnDestroy {
  // entries: Observable<MobilePhoneDealerSummary[]>;
  entries: Complaint[] = [];
  entriesSubs: Subscription;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.entries = this.complaintService.getEntries();
    this.entriesSubs = this.complaintService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
      },
    });
    this.complaintService.getEntriesAPI();
    this.complaintService.resourceType.next(LIST);
  }

  ngOnDestroy() {
    this.entriesSubs.unsubscribe();
  }
}
