import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, Subject } from 'rxjs';
import { dateWithPadding } from '../shared/utility';
import { ServiceCenterReportSummary } from './models/service-center-report-summary.model';
import { ServiceCenterReport } from './models/service-center-report.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceCenterReportService {
  private sampleEntries: ServiceCenterReportSummary[] = [
    {
      dateInspected: new Date(),
      id: '1111',
      approver: 'Me',
      isApproved: true,
      nameOfServiceCenter: 'WIMAX',
      notedby: 'DJXCDS',
    },
  ];
  private entries: ServiceCenterReport[] = [];
  private entriesListener = new Subject<ServiceCenterReport[]>();

  constructor() {}

  getEntries(): ServiceCenterReport[] {
    return this.entries;
  }

  getEntriesListener(): Observable<ServiceCenterReport[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): ServiceCenterReport {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: ServiceCenterReport): void {
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO());
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, { ...data, dateInspected: dateISO, id: `${idGenerated}` }];
    this.entriesListener.next(this.entries);
  }

  updateOne(formId: string, data: ServiceCenterReport): void {
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
