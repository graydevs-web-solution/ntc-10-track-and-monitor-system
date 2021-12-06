import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Setting } from './model/setting';
import { UserAssignedData } from './model/user-assigned-data';

@Injectable({
  providedIn: 'root',
})
export class SystemSettingService {
  private domainURL = environment.apiUrl;
  private resource1 = 'api/system-setting';
  private regDirectorInfo = {
    ['user_id']: '',
    name: '',
  };
  private formCounters: Setting[] = [];
  private errorGetRegDir = new Subject();
  private errorGetFormCounter = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  getRegionalDirectorAPISuccess(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<{ data: UserAssignedData }>(`${this.domainURL}/${this.resource1}/regional-director`).subscribe({
        next: ({ data }) => {
          this.regDirectorInfo.name = data.name || 'No Regional Director';
          this.regDirectorInfo.user_id = data.user_id;
          localStorage.setItem('regionalDirector', JSON.stringify({ ...this.regDirectorInfo }));
          resolve(true);
        },
        error: (err) => {
          this.errorGetRegDir.next(err);
          reject(false);
        },
      });
    });
  }

  getRegionalDirectorLocalStorage() {
    const regionalDirector = localStorage.getItem('regionalDirector');
    if (!regionalDirector) {
      return;
    }
    this.regDirectorInfo = JSON.parse(regionalDirector);
  }

  getListenerRegDir() {
    return this.errorGetRegDir.asObservable();
  }

  getRegionalDirectorInfo() {
    return this.regDirectorInfo;
  }

  saveRegionalDirector(data: UserAssignedData): Observable<{ data: UserAssignedData }> {
    return this.http.post<{ data: UserAssignedData }>(`${this.domainURL}/${this.resource1}/regional-director`, data);
  }

  getFormCountersAPISuccess(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<{ data: Setting[] }>(`${this.domainURL}/${this.resource1}/form-counters`).subscribe({
        next: ({ data }) => {
          this.formCounters = data;
          localStorage.setItem('formCounter', JSON.stringify([...this.formCounters]));
          resolve(true);
        },
        error: (err) => {
          this.errorGetFormCounter.next(err);
          reject(false);
        },
      });
    });
  }

  getFormCountersLocalStorage() {
    const formCounter = localStorage.getItem('formCounter');
    if (!formCounter) {
      return;
    }
    this.formCounters = JSON.parse(formCounter);
  }

  getListenerFormCounter() {
    return this.errorGetFormCounter.asObservable();
  }

  getFormCounterInfo() {
    return this.formCounters;
  }

  saveFormCounterADX(data: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.domainURL}/${this.resource1}/adm-counter`, { data });
  }

  saveFormCounterROX(data: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.domainURL}/${this.resource1}/rox-counter`, { data });
  }
}
