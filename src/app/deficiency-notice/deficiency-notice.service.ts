import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Approval } from '../shared/models/approvalStatus';
import { PageOptions } from '../shared/models/page-options';
import { formatDate, openPDF } from '../shared/utility';
import { Setting } from '../system-setting/model/setting';
import { DeficiencyNoticeAPI, ResponseAddDeficiencyNotice } from './models/deficiency-notice-api.model';
import { DeficiencyNotice } from './models/deficiency-notice.model';

@Injectable({
  providedIn: 'root',
})
export class DeficiencyNoticeService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();

  private entries: DeficiencyNotice[] = [];
  private entriesListener = new Subject<DeficiencyNotice[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/deficiency-notice';

  constructor(private http: HttpClient) {}

  getEntries(): DeficiencyNotice[] {
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
      .get<{ data: DeficiencyNoticeAPI[] }>(`${this.domainURL}/${this.resource1}`, {
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

  getEntriesListener(): Observable<DeficiencyNotice[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): DeficiencyNotice {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: DeficiencyNotice): Observable<{ data: ResponseAddDeficiencyNotice }> {
    return this.http.post<{ data: ResponseAddDeficiencyNotice }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  updateOne(formId: string, data: DeficiencyNotice): Observable<{ message: string }> {
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
          pdfWindow.document.write(openPDF(response, 'Deficiency Notice'));
          pdfWindow.document.close();
          // saveAs(response, 'sss.pdf');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatData = (data: DeficiencyNotice): DeficiencyNotice => {
    const formattedData: DeficiencyNotice = {
      ...data,
      date: formatDate(data.date as string),
      dateOfInspection: formatDate(data.dateOfInspection as string),
      dateOfDeficiencyHearing: formatDate(data.dateOfDeficiencyHearing as string),
    };

    return formattedData;
  };

  formatList = (data: DeficiencyNoticeAPI): DeficiencyNotice => {
    const value: DeficiencyNotice = {
      id: data.id,
      dateOfInspection: formatDate(data.date_of_inspection as Date, false),
      respondentName: data.respondent_name,
      date: formatDate(data.date, false),
      clientId: data.client_id,
      clientName: data.clients.owner_name,
      docketNumberDescription: data.docket_number_description,
      docketNumberStart: data.docket_number_start,
      docketNumberEnd: data.docket_number_end,
      transmitters: data.deficiency_notice_transmitter
        ? data.deficiency_notice_transmitter.map((val) => ({
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
      dateOfDeficiencyHearing: formatDate(data.date_of_deficiency_hearing as Date, false),
      regionalDirector: data.regional_director,
      regionalDirectorInfo: {
        ...data.regional_director_info,
        name: `${data.regional_director_info.name_first} ${data.regional_director_info.name_last}`,
      },
      regionalDirectorApproved: data.regional_director_approved,
      isDone: data.is_done,
    };
    return value;
  };

  setApprovalStatus(payload: Approval) {
    return this.http.post<{ message: string }>(`${this.domainURL}/${this.resource1}/approval`, payload);
  }
}
