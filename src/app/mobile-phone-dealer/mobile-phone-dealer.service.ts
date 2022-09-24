import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../shared/models/api-response';
import { Approval } from '../shared/models/approvalStatus';
import { PageOptions } from '../shared/models/page-options';
import { dateWithPadding, formatDate, openPDF } from '../shared/utility';
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
    collectionSize: 0,
  };
  resourceType = new ReplaySubject<string>();

  private entries: MobilePhoneDealer[] = [];
  private entriesListener = new Subject<MobilePhoneDealer[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/mobile-phone-dealer';

  constructor(private http: HttpClient) {}

  setPage(payload: PageOptions) {
    this.page = payload;
  }

  getPage() {
    return this.page;
  }

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
      .get<APIResponse>(`${this.domainURL}/${this.resource1}`, {
        params: PARAMS,
      })
      .pipe(map(({ data, collectionSize }) => ({ data: (data as MobilePhoneDealerAPI[]).map(this.formatList), collectionSize })))
      .subscribe({
        next: (response) => {
          this.entries = response.data;

          this.page = {
            ...this.page,
            collectionSize: response.collectionSize,
          };

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
          const pdfWindow = window.open();
          pdfWindow.document.write(openPDF(response, 'Mobile Phone Dealer'));
          pdfWindow.document.close();
          // saveAs(response, 'sss.pdf');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatData = (data: MobilePhoneDealer): MobilePhoneDealer => {
    const formattedData: MobilePhoneDealer = {
      ...data,
      dateInspected: formatDate(data.dateInspected as string),
      permitExpiryDate: formatDate(data.permitExpiryDate as string),
    };
    return formattedData;
  };

  formatList = (data: MobilePhoneDealerAPI): MobilePhoneDealer => {
    const value: MobilePhoneDealer = {
      id: data.id,
      dateInspected: formatDate(data.date_inspected, false),
      clientId: data.client_id,
      clientName: data.clients.business_name,
      permitNumber: data.permit_number,
      permitExpiryDate: formatDate(data.permit_expiry_date as Date, false),
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
        oneCb: data.sundry_one,
        twoCb: data.sundry_two,
      },
      remarksDeficienciesDiscrepanciesNoted: data.remarks_deficiencies_discrepancies_noted,
      inspectedBy: data.inspected_by,
      ownerInfo: {
        name: data.owner_name,
        position: data.owner_position,
      },
      recommendations: data.recommendations,
      notedBy: data.noted_by,
      notedByApproved: data.noted_by_approved,
      regionalDirector: data.regional_director,
      regionalDirectorApproved: data.regional_director_approved,
      notedByInfo: data.noted_by_info,
      regionalDirectorInfo: data.regional_director_info,
    };
    return value;
  };

  setApprovalStatus(payload: Approval) {
    return this.http.post<{ message: string }>(`${this.domainURL}/${this.resource1}/approval`, payload);
  }
}
