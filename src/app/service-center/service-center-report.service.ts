import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { dateWithPadding } from '../shared/utility';
import { ServiceCenterReportSummary } from './models/service-center-summary.model';
import { ServiceCenterReport } from './models/service-center.model';

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
  private summaryEntries: ServiceCenterReportSummary[] = [];
  private entries: ServiceCenterReport[] = [];

  constructor() {}

  getEntries(): ServiceCenterReportSummary[] {
    return this.summaryEntries;
  }

  getSelectedEntry(id: string): ServiceCenterReport {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: ServiceCenterReport): void {
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
        nameOfServiceCenter: data.nameOfServiceCenter,
        notedby: data.notedby,
      },
    ];
  }
}
