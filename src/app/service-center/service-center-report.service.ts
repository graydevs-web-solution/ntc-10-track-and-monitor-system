import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageOptions } from '../shared/models/page-options';
import { dateWithPadding } from '../shared/utility';
import { ServiceCenterReportAPI } from './models/service-center-report-api.model';
import { ServiceCenterReport } from './models/service-center-report.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceCenterReportService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();

  private entries: ServiceCenterReport[] = [];
  private entriesListener = new Subject<ServiceCenterReport[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/service-center';

  constructor(private http: HttpClient) {}

  getEntries(): ServiceCenterReport[] {
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
      .get<{ data: ServiceCenterReportAPI[] }>(`${this.domainURL}/${this.resource1}`, {
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

  getEntriesListener(): Observable<ServiceCenterReport[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): ServiceCenterReport {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: ServiceCenterReport): Observable<{ data: ServiceCenterReport }> {
    return this.http.post<{ data: ServiceCenterReport }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  updateOne(formId: string, data: ServiceCenterReport): Observable<{ message: string }> {
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

  formatData = (data: ServiceCenterReport): ServiceCenterReport => {
    const formattedData: ServiceCenterReport = {
      ...data,
      dateInspected: new Date(DateTime.fromISO(dateWithPadding(data.dateInspected as string)).toISO()),
    };
    return formattedData;
  };

  formatList = (data: ServiceCenterReportAPI): ServiceCenterReport => {
    const value: ServiceCenterReport = {
      id: data.id,
      dateInspected: data.date_inspected ? DateTime.fromISO(data.date_inspected.toLocaleString()).toISO() : null,
      clientId: data.client_id,
      clientName: data.clients.name,
      listOfServiceOrTestEquipments: data.list_of_service_or_test_equipments
        ? data.list_of_service_or_test_equipments.map((val) => ({
            particular: val.particular,
            numberOfUnits: val.number_of_units,
          }))
        : [],
      employedElectronicsTechnicians: data.employed_electronics_technicians
        ? data.employed_electronics_technicians.map((val) => ({
            name: val.name,
            qualifications: val.qualifications,
          }))
        : [],
      sundryOfInformation: {
        one: data.sundry_one,
        two: data.sundry_two,
        three: data.sundry_three,
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
