import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageOptions } from '../shared/models/page-options';
import { dateWithPadding } from '../shared/utility';
import { MobilePhoneDealerAPI } from './models/mobile-phone-dealer-api.model';
import { MobilePhoneDealer } from './models/mobile-phone-dealer.model';

@Injectable({
  providedIn: 'root',
})
export class MobilePhoneDealerService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();

  private entries: MobilePhoneDealer[] = [];
  private entriesListener = new Subject<MobilePhoneDealer[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/mobile-phone-dealer';

  constructor(private http: HttpClient) {}

  getEntries(): MobilePhoneDealer[] {
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
      .get<{ data: MobilePhoneDealerAPI[] }>(`${this.domainURL}/${this.resource1}`, {
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

  getEntriesListener(): Observable<MobilePhoneDealer[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): MobilePhoneDealer {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: MobilePhoneDealer): Observable<{ data: MobilePhoneDealer }> {
    return this.http.post<{ data: MobilePhoneDealer }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  updateOne(formId: string, data: MobilePhoneDealer): Observable<{ message: string }> {
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

  formatData = (data: MobilePhoneDealer): MobilePhoneDealer => {
    const formattedData: MobilePhoneDealer = {
      ...data,
      dateInspected: new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO()),
    };
    return formattedData;
  };

  formatList = (data: MobilePhoneDealerAPI): MobilePhoneDealer => {
    const value: MobilePhoneDealer = {
      id: data.id,
      dateInspected: data.date_inspected ? DateTime.fromISO(data.date_inspected.toLocaleString()).toISO() : null,
      clientId: data.client_id,
      clientName: data.clients.name,
      listOfStocksOfSparesAndAccessories: data.spares_and_accessories
        ? data.spares_and_accessories.map((val) => ({
            particular: val.particular,
            numberOfUnits: val.number_of_units,
          }))
        : [],
      listOfStocksOfMobilePhone: data.mobile_phones
        ? data.mobile_phones.map((val) => ({
            model: val.model,
            imeiNumber: val.imei_number,
            source: val.source,
          }))
        : [],
      listOfStocksOfSubscriberIdentificationModule: data.sim
        ? data.sim.map((val) => ({
            simNumber: val.sim_number,
            mobilePhoneCompany: val.mobile_phone_company,
          }))
        : [],
      sundryOfInformation: {
        one: data.sundry_one,
        two: data.sundry_two,
      },
      remarksDeficienciesDiscrepanciesNoted: data.remarks_deficiencies_discrepancies_noted,
      inspectedBy: data.inspected_by,
      ownerInfo: {
        name: data.owner_name,
        position: data.owner_position,
      },
      recommendations: data.recommendations,
      notedBy: data.noted_by,
      regionalDirector: data.regional_director,
      isApproved: data.is_approved,
    };
    return value;
  };
}
