import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageOptions } from '../shared/models/page-options';
import { formatDate, formatTime, openPDF } from '../shared/utility';
import { ComplaintAPI } from './models/complaint-api.model';
import { Complaint } from './models/complaint.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();

  private entries: Complaint[] = [];
  private entriesListener = new Subject<Complaint[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/complaint';

  constructor(private http: HttpClient) {}

  getEntries(): Complaint[] {
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
      .get<{ data: ComplaintAPI[] }>(`${this.domainURL}/${this.resource1}`, {
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

  getEntriesListener(): Observable<Complaint[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): Complaint {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: Complaint): Observable<{ data: Complaint }> {
    return this.http.post<{ data: Complaint }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  updateOne(formId: string, data: Complaint): Observable<{ message: string }> {
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
          pdfWindow.document.write(openPDF(response, 'Complaint'));
          pdfWindow.document.close();
          // saveAs(response, 'sss.pdf');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatData = (data: Complaint): Complaint => {
    const formattedData: Complaint = {
      ...data,
      date: formatDate(data.date as string),
      dateOfInspection: formatDate(data.dateOfInspection as string),
      dateOfHearing: formatDate(data.dateOfHearing as string),
    };
    return formattedData;
  };

  formatList = (data: ComplaintAPI): Complaint => {
    const value: Complaint = {
      id: data.id,
      date: formatDate(data.date, false),
      complainantName: data.complainant_name,
      clientId: data.client_id,
      clientName: data.clients.business_name,
      respondentName: data.respondent_name,
      docketNumber: data.docket_number,
      dateOfInspection: formatDate(data.date_of_inspection as Date, false),
      location: data.location,
      reason: data.reason,
      transmitters: data.complaint_transmitter
        ? data.complaint_transmitter.map((val) => ({
            transmitter: val.transmitter,
            serialNumber: val.serial_number,
          }))
        : [],
      violationInfo: {
        operationWithoutRSL: data.vi_operation_without_rsl,
        operationWithoutLRO: data.vi_operation_without_lro,
        operationUnauthorizedFrequency: data.vi_operation_unauthorized_frequency,
        possessionTransmitterWithoutPP: data.vi_possession_transmitter_without_pp,
        noNTCPertinentPapers: data.vi_no_ntc_pertinent_papers,
      },
      dateOfHearing: formatDate(data.date_time_of_hearing as Date, false),
      timeOfHearing: formatTime(data.date_time_of_hearing as Date),
      isDone: data.is_done,
      regionalDirector: data.regional_director,
    };
    return value;
  };
}
