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
  private notedByInfo = {
    ['user_id']: '',
    name: '',
  };
  private formCounters: Setting[] = [];
  private errorGetRegDir = new Subject();
  private errorGetNotedBy = new Subject();
  private errorGetFormCounter = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  getRegionalDirectorAPISuccess(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<{ data: UserAssignedData }>(`${this.domainURL}/${this.resource1}/regional-director`).subscribe({
        next: ({ data }) => {
          this.setLocalStorageRegionalDirector(data);
          resolve(true);
        },
        error: (err) => {
          this.errorGetRegDir.next(err);
          reject(false);
        },
      });
    });
  }

  setLocalStorageRegionalDirector(data: UserAssignedData) {
    this.regDirectorInfo.name = data.name || 'No Regional Director';
    this.regDirectorInfo.user_id = data.user_id;
    localStorage.setItem('regionalDirector', JSON.stringify({ ...this.regDirectorInfo }));
  }

  getNotedByAPISuccess(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<{ data: UserAssignedData }>(`${this.domainURL}/${this.resource1}/noted-by`).subscribe({
        next: ({ data }) => {
          this.setLocalStorageNotedBy(data);
          resolve(true);
        },
        error: (err) => {
          this.errorGetNotedBy.next(err);
          reject(false);
        },
      });
    });
  }

  setLocalStorageNotedBy(data: UserAssignedData) {
    this.notedByInfo.name = data.name || 'No Noted By';
    this.notedByInfo.user_id = data.user_id;
    localStorage.setItem('notedBy', JSON.stringify({ ...this.notedByInfo }));
  }

  getRegionalDirectorLocalStorage() {
    const regionalDirector = localStorage.getItem('regionalDirector');
    if (!regionalDirector) {
      return;
    }
    this.regDirectorInfo = JSON.parse(regionalDirector);
  }

  getNotedByLocalStorage() {
    const notedBy = localStorage.getItem('notedBy');
    if (!notedBy) {
      return;
    }
    this.notedByInfo = JSON.parse(notedBy);
  }

  getListenerRegDir() {
    return this.errorGetRegDir.asObservable();
  }

  getListenerNotedBy() {
    return this.errorGetNotedBy.asObservable();
  }

  getRegionalDirectorInfo() {
    return this.regDirectorInfo;
  }

  getNotedByInfo() {
    return this.notedByInfo;
  }

  saveRegionalDirector(data: UserAssignedData): Promise<{ data: UserAssignedData }> {
    return new Promise((resolve, reject) => {
      this.http.post<{ data: UserAssignedData }>(`${this.domainURL}/${this.resource1}/regional-director`, data).subscribe({
        next: (res) => {
          this.setLocalStorageRegionalDirector(res.data);
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  saveNotedBy(data: UserAssignedData): Promise<{ data: UserAssignedData }> {
    return new Promise((resolve, reject) => {
      this.http.post<{ data: UserAssignedData }>(`${this.domainURL}/${this.resource1}/noted-by`, data).subscribe({
        next: (res) => {
          this.setLocalStorageNotedBy(res.data);
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
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
