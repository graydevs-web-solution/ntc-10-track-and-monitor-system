import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, Subject } from 'rxjs';
import { dateWithPadding } from '../shared/utility';
import { MobilePhoneDealerSummary } from './models/mobile-phone-dealer-summary.model';
import { MobilePhoneDealer } from './models/mobile-phone-dealer.model';

@Injectable({
  providedIn: 'root',
})
export class MobilePhoneDealerService {
  private sampleEntries: MobilePhoneDealerSummary[] = [
    {
      dateInspected: new Date(),
      id: '1111',
      approver: 'Me',
      isApproved: true,
      nameOfDealer: 'Woodford Nono',
      notedby: 'DJXCDS',
    },
  ];
  private entries: MobilePhoneDealer[] = [];
  private entriesListener = new Subject<MobilePhoneDealer[]>();

  constructor() {}

  getEntries(): MobilePhoneDealer[] {
    return this.entries;
  }

  getEntriesListener(): Observable<MobilePhoneDealer[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): MobilePhoneDealer {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: MobilePhoneDealer): void {
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO());
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, dateInspected: dateISO, id: `${idGenerated}` }];
    this.entriesListener.next(this.entries);
  }

  updateOne(formId: string, data: MobilePhoneDealer): void {
    const existingEntryIndex = this.entries.findIndex((entry) => entry.id === formId);
    const newEntries = [...this.entries];
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO());
    newEntries[existingEntryIndex] = { ...data, dateInspected: dateISO, id: formId };
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }

  deleteOne(formId: string): void {
    const newEntries = this.entries.filter((entry) => entry.id !== formId);
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }
}
