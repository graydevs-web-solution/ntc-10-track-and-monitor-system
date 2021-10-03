import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Client } from './models/client.model';
import { PageOptions } from 'src/app/shared/models/page-options';
import { map, tap } from 'rxjs/operators';
import { ClientAPI } from './models/client-api.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  saveClientListener = new Subject();
  selectedEntry = new Subject<Client>();

  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };

  private entries: Client[] = [];
  private entriesListener = new Subject<Client[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/client';

  constructor(private http: HttpClient) {}

  getEntries(): Client[] {
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
      .get<{ data: ClientAPI[] }>(`${this.domainURL}/${this.resource1}`, {
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

  formatList = (data: ClientAPI): Client => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { owner_name, owner_position, business_name, business_address, ...rest } = data;
    const value: Client = {
      ownerName: owner_name,
      ownerPosition: owner_position,
      businessName: business_name,
      businessAddress: business_address,
      ...rest,
    };
    return value;
  };

  getEntriesListener(): Observable<Client[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): Client {
    return this.entries.find((entry) => entry.id === id);
  }

  addOne(data: Client): Observable<{ data: Client }> {
    return this.http.post<{ data: Client }>(`${this.domainURL}/${this.resource1}/`, data);
  }

  updateOne(formId: string, data: Client): void {
    const existingEntryIndex = this.entries.findIndex((entry) => entry.id === formId);
    const newEntries = [...this.entries];
    newEntries[existingEntryIndex] = { ...data, id: formId };
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }

  deleteOne(formId: string): void {
    const newEntries = this.entries.filter((entry) => entry.id !== formId);
    this.entries = newEntries;
    this.entriesListener.next(this.entries);
  }

  search(term: string): Observable<Client[]> {
    const PARAMS = new HttpParams({
      fromObject: {
        page: `1`,
        size: `${this.page.size}`,
      },
    });
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<{ data: ClientAPI[] }>(`${this.domainURL}/${this.resource1}/search`, { params: PARAMS.set('search', term) })
      .pipe(map(({ data }) => data.map(this.formatList)));
  }
}
