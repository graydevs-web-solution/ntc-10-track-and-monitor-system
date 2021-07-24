import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ServiceCenter } from './models/service-center.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceCenterService {
  saveServiceCenterListener = new Subject();
  selectedEntry = new Subject<ServiceCenter>();

  private entries: ServiceCenter[] = [];
  private entriesListener = new Subject<ServiceCenter[]>();

  constructor() {}

  getEntries(): ServiceCenter[] {
    return this.entries;
  }

  getEntriesListener(): Observable<ServiceCenter[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): ServiceCenter {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: ServiceCenter): void {
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, id: `${idGenerated}` }];
    this.entriesListener.next(this.entries);
  }

  updateOne(formId: string, data: ServiceCenter): void {
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
