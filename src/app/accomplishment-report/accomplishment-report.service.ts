import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { PageOptions } from '../shared/models/page-options';
import { openPDF } from '../shared/utility';
import { AccomplishmentReportAPI } from './models/accomplishment-report-api';
import { AccomplishmentReport } from './models/accomplishment-report.model';

@Injectable({
  providedIn: 'root',
})
export class AccomplishmentReportService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();
  saveAccomplishmentReportListener = new Subject();

  private entries: AccomplishmentReport[] = [];
  private entriesListener = new Subject<AccomplishmentReport[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/accomplishment-report';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getEntries(): AccomplishmentReport[] {
    return this.entries;
  }

  getEntriesAPI(): void {
    // if (isDev) {
    //   const sample: DeficiencyNotice[] = [
    //     {
    //       clientId: 1,
    //       date: new Date(Date.now()),
    //       dateOfDeficiencyHearing: new Date(Date.now()),
    //       docketNumber: 'ROX-DF-031-2019',
    //       transmitters: [{ transmitter: 'asdasdas', serialNumber: 'asdasd' }],
    //       regionalDirector: 'Ser Ted',
    //       violationInfo: {
    //         operationWithoutRSL: true,
    //         operationWithoutLRO: true,
    //         operationUnauthorizedFrequency: true,
    //         possessionTransmitterWithoutPP: true,
    //         noNTCPertinentPapers: true,
    //       },
    //       clientName: 'Sample Name',
    //       isDone: false,
    //       id: 1,
    //     },
    //   ];
    //   this.entries = sample;
    //   this.entriesListener.next(sample);
    //   return;
    // }
    const PARAMS = new HttpParams({
      fromObject: {
        page: `${this.page.current}`,
        size: `${this.page.size}`,
      },
    });
    this.http
      .get<{ data: AccomplishmentReportAPI[] }>(`${this.domainURL}/${this.resource1}`, {
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

  getEntriesListener(): Observable<AccomplishmentReport[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): AccomplishmentReport {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: AccomplishmentReport): Observable<{ data: AccomplishmentReport }> {
    const attorneyId = this.authService.getUserInfo().user_id;
    data.attorney = `${attorneyId}`;
    return this.http.post<{ data: AccomplishmentReport }>(`${this.domainURL}/${this.resource1}/`, data);
  }

  updateOne(formId: string, data: AccomplishmentReport): Observable<{ message: string }> {
    data.id = +formId;
    return this.http.patch<{ message: string }>(`${this.domainURL}/${this.resource1}/`, data);
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
          pdfWindow.document.write(openPDF(response, 'Accomplishment Report'));
          pdfWindow.document.close();
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatList = (data: AccomplishmentReportAPI): AccomplishmentReport => {
    const value: AccomplishmentReport = {
      id: data.id,
      month: data.month,
      year: data.year,
      description: data.description,
      numberOfAdminCase: data.number_of_admin_case,
      numberOfPendingComplaint: data.number_of_pending_complaint,
      numberOfHearing: data.number_of_hearing,
      numberOfResolvedComplaint: data.number_of_resolved_complaint,
      numberOfShowCause: data.number_of_show_cause,
      attorney: data.attorney_info,
    };
    return value;
  };
}
