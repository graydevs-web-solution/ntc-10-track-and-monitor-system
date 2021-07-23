import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Station } from './models/station.model';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  saveStationListener = new Subject();
  selectedEntry = new Subject<Station>();

  private entries: Station[] = [];
  private entriesListener = new Subject<Station[]>();

  constructor() {}

  getEntries(): Station[] {
    return this.entries;
  }

  getEntriesListener(): Observable<Station[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): Station {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: Station): void {
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, id: `${idGenerated}` }];
    this.entriesListener.next(this.entries);
  }

  updateOne(formId: string, data: Station): void {
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
