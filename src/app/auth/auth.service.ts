import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageOptions } from '../shared/models/page-options';
import { LoginResponse } from './model/response';
import { User } from './model/user';
import jwt_decode from '../../../node_modules/jwt-decode';
import { UserAuthenticated } from './model/user-authenticated';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();
  selectedEntry = new Subject<User>();
  saveUserListener = new Subject();

  private entries: User[] = [];
  private entriesListener = new Subject<User[]>();
  private loginErrorListener = new Subject<HttpErrorResponse>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/auth';
  private token = '';
  private tokenTimer: NodeJS.Timeout;
  private isAuthenticated = false;
  private userLoggedInInfo: Partial<UserAuthenticated>;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getEntries(): User[] {
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
      .get<{ data: User[] }>(`${this.domainURL}/${this.resource1}/users`, {
        params: PARAMS,
      })
      // .pipe(map(({ data }) => ({ data: data.map(this.formatList) })))
      .subscribe({
        next: (response) => {
          this.entries = response.data;
          this.entriesListener.next(response.data);
        },
      });
  }

  getEntriesListener(): Observable<User[]> {
    return this.entriesListener.asObservable();
  }

  getLoginErrorListener(): Observable<HttpErrorResponse> {
    return this.loginErrorListener.asObservable();
  }

  getAuthListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getSelectedEntry(id: string): User {
    return this.entries.find((entry) => entry.user_id === id);
  }

  addOne(data: User): Observable<{ data: User }> {
    return this.http.post<{ data: User }>(`${this.domainURL}/${this.resource1}/new-user`, data);
  }

  updateOne(formId: string, data: User): Observable<{ message: string }> {
    data.user_id = formId;
    return this.http.patch<{ message: string }>(`${this.domainURL}/${this.resource1}/update-user-info`, data);
  }

  loginAPI(data: Partial<User>): void | Error {
    const value = { ['user_name']: data.user_name, password: data.password };
    this.http.post<LoginResponse>(`${this.domainURL}/${this.resource1}/`, value).subscribe({
      next: (res) => {
        this.createUserPass(res.token);
      },
      error: (error: HttpErrorResponse) => {
        this.loginErrorListener.next(error);
      },
    });
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  createUserPass(token) {
    this.token = token;
    if (token) {
      const { expiresIn, name, position, userName } = jwt_decode<UserAuthenticated>(token);
      this.userLoggedInInfo = { name, position, userName };
      const expirationTimer = expiresIn * 1000;
      this.setAuthTimer(expirationTimer);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expirationTimer);
      this.saveAuthData(token, expirationDate);
      this.router.navigate(['/home']);
    } else {
      this.authStatusListener.next(false);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.userLoggedInInfo = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    this.router.navigate(['/auth']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const decodedToken = jwt_decode<UserAuthenticated>(authInformation.token);
    const now = new Date();
    const expiresIn = authInformation.expiresIn.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userLoggedInInfo = {
        id: decodedToken.id,
        name: decodedToken.name,
        position: decodedToken.position,
        userName: decodedToken.userName,
      };
      this.setAuthTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }

  initForm = (): FormGroup => {
    return new FormGroup({
      ['user_id']: new FormControl({ value: '', disabled: false }),
      ['name_first']: new FormControl({ value: '', disabled: false }),
      ['name_middle']: new FormControl({ value: '', disabled: false }),
      ['name_last']: new FormControl({ value: '', disabled: false }),
      ['user_name']: new FormControl({ value: '', disabled: false }),
      ['position']: new FormControl({ value: '', disabled: false }),
    });
  };

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration);
  }

  private getAuthData(): LoginResponse {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expiresIn: new Date(expirationDate),
    };
  }

  // deleteOne(formId: string): Observable<{ message: string }> {
  //   const PARAMS = new HttpParams({
  //     fromObject: {
  //       id: `${formId}`,
  //     },
  //   });
  //   return this.http.delete<{ message: string }>(`${this.domainURL}/${this.resource1}/`, {
  //     params: PARAMS,
  //   });
  // }

  // generatePdf(formId: string) {
  //   const PARAMS = new HttpParams({
  //     fromObject: {
  //       id: `${formId}`,
  //     },
  //   });
  //   this.http
  //     .get(`${this.domainURL}/${this.resource1}/pdf`, {
  //       responseType: 'text',
  //       params: PARAMS,
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         const pdfWindow = window.open();
  //         pdfWindow.document.write(openPDF(response, 'Complaint'));
  //         pdfWindow.document.close();
  //         // saveAs(response, 'sss.pdf');
  //       },
  //       error: (err) => {
  //         console.log('err', err);
  //       },
  //     });
  // }

  // formatData = (data: Complaint): Complaint => {
  //   const formattedData: Complaint = {
  //     ...data,
  //     date: formatDate(data.date as string),
  //     dateOfInspection: formatDate(data.dateOfInspection as string),
  //     dateOfHearing: formatDate(data.dateOfHearing as string),
  //   };
  //   return formattedData;
  // };

  // formatList = (data: ComplaintAPI): Complaint => {
  //   const value: Complaint = {
  //     id: data.id,
  //     date: formatDate(data.date, false),
  //     complainantName: data.complainant_name,
  //     clientId: data.client_id,
  //     clientName: data.clients.owner_name,
  //     respondentName: data.respondent_name,
  //     docketNumber: data.docket_number,
  //     dateOfInspection: formatDate(data.date_of_inspection as Date, false),
  //     location: data.location,
  //     reason: data.reason,
  //     transmitters: data.complaint_transmitter
  //       ? data.complaint_transmitter.map((val) => ({
  //           transmitter: val.transmitter,
  //           serialNumber: val.serial_number,
  //         }))
  //       : [],
  //     violationInfo: {
  //       operationWithoutRSL: data.vi_operation_without_rsl,
  //       operationWithoutLRO: data.vi_operation_without_lro,
  //       operationUnauthorizedFrequency: data.vi_operation_unauthorized_frequency,
  //       possessionTransmitterWithoutPP: data.vi_possession_transmitter_without_pp,
  //       noNTCPertinentPapers: data.vi_no_ntc_pertinent_papers,
  //     },
  //     dateOfHearing: formatDate(data.date_time_of_hearing as Date, false),
  //     timeOfHearing: formatTime(data.date_time_of_hearing as Date),
  //     isDone: data.is_done,
  //     regionalDirector: data.regional_director,
  //   };
  //   return value;
  // };
}
