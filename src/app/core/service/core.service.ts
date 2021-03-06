import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private appVersion = environment.appVersion;

  constructor() {}

  getAppVersion(): string {
    return this.appVersion;
  }

  logout() {
    // eslint-disable-next-line no-console
    console.debug('Log out');
  }
}
