import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
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
  private summaryEntries: MobilePhoneDealerSummary[] = [];
  private entries: MobilePhoneDealer[] = [];

  constructor() {}

  getEntries(): MobilePhoneDealerSummary[] {
    return this.summaryEntries;
  }

  getSelectedEntry(id: string): MobilePhoneDealer {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: MobilePhoneDealer): void {
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO());
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, dateInspected: dateISO, id: `${idGenerated}` }];
    this.summaryEntries = [
      ...this.summaryEntries,
      {
        dateInspected: dateISO,
        id: idGenerated,
        approver: data.approver,
        isApproved: data.isApproved,
        nameOfDealer: data.nameOfDealer,
        notedby: data.notedby,
      },
    ];
  }
}
