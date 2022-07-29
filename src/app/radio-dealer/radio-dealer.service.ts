import { formatDate, openPDF } from './../shared/utility';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageOptions } from '../shared/models/page-options';
import { dateWithPadding } from '../shared/utility';
import { RadioDealerAPI } from './models/radio-dealer-api.model';
import { RadioDealer } from './models/radio-dealer.model';
import { Approval } from '../shared/models/approvalStatus';

@Injectable({
  providedIn: 'root',
})
export class RadioDealerService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();

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
          const pdfWindow = window.open();
          pdfWindow.document.write(openPDF(response, 'Radio Dealer'));
          pdfWindow.document.close();
          // saveAs(response, 'sss.pdf');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatData = (data: RadioDealer): RadioDealer => {
    const formattedData: RadioDealer = {
      ...data,
      dateInspected: formatDate(data.dateInspected as string),
      permitExpiryDate: formatDate(data.permitExpiryDate as string),
      supervisingECE: data.supervisingECE.map((val) => ({
        ...val,
        expiryDate: formatDate(val.expiryDate as string),
        dateIssued: formatDate(val.dateIssued as string),
      })),
      radioTechnicians: data.radioTechnicians.map((val) => ({
        ...val,
        expiryDate: formatDate(val.expiryDate as string),
      })),
    };
    return formattedData;
  };

  formatList = (data: RadioDealerAPI): RadioDealer => {
    const value: RadioDealer = {
      id: data.id,
      dateInspected: formatDate(data.date_inspected as Date, false),
      clientId: data.client_id,
      clientName: data.clients.business_name,
      permitNumber: data.permit_number,
      permitExpiryDate: formatDate(data.permit_expiry_date as Date, false),
      supervisingECE: data.supervising_ece
        ? data.supervising_ece.map((val) => ({
            name: val.name,
            licenseNumber: val.license_number,
            expiryDate: formatDate(val.expiry_date as Date, false),
            ptrNumber: val.ptr_number,
            dateIssued: formatDate(val.date_issued as Date, false),
          }))
        : [],
      radioTechnicians: data.radio_technicians
        ? data.radio_technicians.map((val) => ({
            name: val.name,
            particularsOfLicense: val.particulars_of_license,
            expiryDate: formatDate(val.expiry_date as Date, false),
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
      regionalDirectorApproved: data.regional_director_approved,
      regionalDirectorInfo: data.regional_director_info,
    };
    return value;
  };

  setApprovalStatus(payload: Approval) {
    return this.http.post<{ message: string }>(`${this.domainURL}/${this.resource1}/approval`, payload);
  }
}
