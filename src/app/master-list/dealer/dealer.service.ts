import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, Subject } from 'rxjs';
import { dateWithPadding } from 'src/app/shared/utility';
import { Dealer } from './models/dealer.model';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  saveDealerListener = new Subject();
  selectedEntry = new Subject<Dealer>();

  private entries: Dealer[] = [];
  private entriesListener = new Subject<Dealer[]>();

  constructor() {}

  getEntries(): Dealer[] {
    return this.entries;
  }

  getEntriesListener(): Observable<Dealer[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): Dealer {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: Dealer): void {
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, id: `${idGenerated}` }];
    this.entriesListener.next(this.entries);
  }

  updateOne(formId: string, data: Dealer): void {
    const existingEntryIndex = this.entries.findIndex((entry) => entry.id === formId);
    const newEntries = [...this.entries];
    newEntries[existingEntryIndex] = { ...data, id: formId };
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }

  deleteOne(formId: string): void {
    const newEntries = this.entries.filter((entry) => entry.id !== formId);
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }
}
