import { Injectable } from '@angular/core';
import { RadioTransceiver } from './models/radio-transceiver.model';
import { RadioTransceiverSummary } from './models/radio-transceiver-summary.model';
import { DateTime } from 'luxon';
import { dateWithPadding } from '../shared/utility';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RadioTransceiverService {
  private sampleEntries: RadioTransceiverSummary[] = [
    {
      date: new Date(),
      nameOfStation: 'Sample Station Name',
      authorizedRepresentative: 'Woodford Nono',
      radioRegulationInspector: 'The Programmer',
    },
    {
      date: new Date(),
      nameOfStation: 'Adore Adore Adore',
      authorizedRepresentative: 'Android52',
      radioRegulationInspector: 'DJ Android52',
    },
  ];
  private entries: RadioTransceiver[] = [];
  private entriesListener = new Subject<RadioTransceiver[]>();

  constructor() {}

  getEntries(): RadioTransceiverSummary[] {
    return this.entries;
  }

  getEntriesListener(): Observable<RadioTransceiver[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): RadioTransceiver {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: RadioTransceiver): void {
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.date as string)).toISO());
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, date: dateISO, id: `${idGenerated}` }];
    this.entriesListener.next(this.entries);
  }

  updateOne(formId: string, data: RadioTransceiver): void {
    const existingEntryIndex = this.entries.findIndex((entry) => entry.id === formId);
    const newEntries = [...this.entries];
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.date as string)).toISO());
    newEntries[existingEntryIndex] = { ...data, date: dateISO, id: formId };
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }

  deleteOne(formId: string): void {
    const newEntries = this.entries.filter((entry) => entry.id !== formId);
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }
}
