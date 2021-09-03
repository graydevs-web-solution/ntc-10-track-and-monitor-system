import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageOptions } from '../shared/models/page-options';
import { dateWithPadding } from '../shared/utility';
import { RadioDealerAPI } from './models/radio-dealer-api.model';
import { RadioDealer } from './models/radio-dealer.model';

@Injectable({
  providedIn: 'root',
})
export class RadioDealerService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };

  private entries: RadioDealer[] = [];
  private entriesListener = new Subject<RadioDealer[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/radio-dealer';

  constructor(private http: HttpClient) {}

  getEntries(): RadioDealer[] {
    return this.entries;
  }

  getEntriesAPI(): void {
    const PARAMS = new HttpParams({
      fromObject: {
        page: `${this.page.current}`,
        size: `${this.page.size}`,
      },
    });
    this.http
      .get<{ data: RadioDealerAPI[] }>(`${this.domainURL}/${this.resource1}`, {
        params: PARAMS,
      })
      .pipe(map(({ data }) => ({ data: data.map(this.formatList) })))
      .subscribe({
        next: (response) => {
          this.entries = response.data;
          this.entriesListener.next(response.data);
        },
      });
  }

  getEntriesListener(): Observable<RadioDealer[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): RadioDealer {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: RadioDealer): Observable<{ data: RadioDealer }> {
    return this.http.post<{ data: RadioDealer }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  updateOne(formId: string, data: RadioDealer): Observable<{ message: string }> {
    data.id = +formId;
    return this.http.patch<{ message: string }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  deleteOne(formId: string): Observable<{ message: string }> {
    const PARAMS = new HttpParams({
      fromObject: {
        id: `${formId}`,
      },
    });
    return this.http.delete<{ message: string }>(`${this.domainURL}/${this.resource1}/`, {
      params: PARAMS,
    });
  }

  generatePdf(formId: string) {
    const PARAMS = new HttpParams({
      fromObject: {
        id: `${formId}`,
      },
    });
    this.http
      .get(`${this.domainURL}/${this.resource1}/pdf`, {
        responseType: 'text',
        params: PARAMS,
      })
      .subscribe({
        next: (response) => {
          saveAs(response, 'sss.pdf');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatData = (data: RadioDealer): RadioDealer => {
    const formattedData: RadioDealer = {
      ...data,
      dateInspected: new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO()),
    };
    return formattedData;
  };

  formatList = (data: RadioDealerAPI): RadioDealer => {
    const value: RadioDealer = {
      id: data.id,
      dateInspected: data.date_inspected ? DateTime.fromISO(data.date_inspected.toLocaleString()).toISO() : null,
      clientId: data.client_id,
      clientName: data.clients.name,
      supervisingECE: data.supervising_ece
        ? data.supervising_ece.map((val) => ({
            name: val.name,
            licenseNumber: val.license_number,
            expiryDate: val.expiry_date ? DateTime.fromISO(val.expiry_date.toLocaleString()).toISO() : null,
            ptrNumber: val.ptr_number,
            dateIssued: val.date_issued ? DateTime.fromISO(val.date_issued.toLocaleString()).toISO() : null,
          }))
        : [],
      radioTechnicians: data.radio_technicians
        ? data.radio_technicians.map((val) => ({
            name: val.name,
            particularsOfLicense: val.particulars_of_license,
            expiryDate: val.expiry_date ? DateTime.fromISO(val.expiry_date.toLocaleString()).toISO() : null,
          }))
        : [],
      diagnosticTestEquipmentAndMeasuringInstrumentInfo: {
        reflectometer: data.dtemi_reflectometer,
        frequencyCounter: data.dtemi_frequency_counter,
        powerMeter: data.dtemi_power_meter,
        vtvmDigitalMultimeter: data.dtemi_vtvm_digital_multimeter,
        signalGenerator: data.dtemi_signal_generator,
        oscilloscope: data.dtemi_oscilloscope,
        vomDigitalMultimeter: data.dtemi_vom_digital_multimeter,
        dummyLoadAntenna: data.dtemi_dummy_load_antenna,
      },
      isLaboratoryRoomShielded: data.is_laboratory_room_shielded,
      remarks: data.remarks,
      radioRegulationInspector: data.radio_regulation_inspector,
      ownerName: data.owner_name,
      recommendations: data.recommendations,
      regionalDirector: data.regional_director,
    };
    return value;
  };
}
