import { Injectable } from '@angular/core';
import { RadioTransceiver } from './models/radio-transceiver.model';
import { RadioTransceiverSummary } from './models/radio-transceiver-summary.model';
import { DateTime } from 'luxon';
import { dateWithPadding } from '../shared/utility';

@Injectable({
  providedIn: 'root'
})
export class RadioTransceiverService {
  private sampleEntries: RadioTransceiverSummary[] = [
    {
      date: new Date(),
      nameOfStation: 'Sample Station Name',
      authorizedRepresentative: 'Woodford Nono',
      radioRegulationInspector: 'The Programmer'
    },
    {
      date: new Date(),
      nameOfStation: 'Adore Adore Adore',
      authorizedRepresentative: 'Android52',
      radioRegulationInspector: 'DJ Android52'
    }
  ];
  private summaryEntries: RadioTransceiverSummary[] = [];
  private entries: RadioTransceiver[] = [];

  constructor() { }

  getEntries(): RadioTransceiverSummary[] {
    return this.summaryEntries;
  }

  getSelectedEntry(id: string): RadioTransceiverSummary {
    return this.entries.find(entry => entry.id === id);
  }

  addOne(data: RadioTransceiver): void {
    const dateISO = new Date(DateTime.fromISO(dateWithPadding(data.date as string)).toISO());
    const idGenerated = (Math.random() * (100 - 1) + 1).toFixed();
    this.entries = [...this.entries, {...data, date: dateISO, id: `${idGenerated}` }];
    this.summaryEntries = [
      ...this.summaryEntries,
      {
        authorizedRepresentative: data.authorizedRepresentative,
        date: dateISO,
        nameOfStation: data.nameOfStation,
        radioRegulationInspector: data.radioRegulationInspector,
        id: idGenerated
      }
    ];
  }
}

