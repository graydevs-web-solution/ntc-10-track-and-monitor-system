import { Injectable } from '@angular/core';
import { version } from '../../../../package.json';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private appVersion = version;

  constructor() {}

  getAppVersion(): string {
    return this.appVersion;
  }
}
