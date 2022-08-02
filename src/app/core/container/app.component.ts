import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { CoreService } from '../service/core.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticate = true;
  faPlus = faPlus;

  constructor(public coreService: CoreService, private authService: AuthService, private systemService: SystemSettingService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.systemService.getRegionalDirectorLocalStorage();
    this.systemService.getNotedByLocalStorage();
    this.systemService.getFormCountersLocalStorage();
    this.authService.getAuthListener().subscribe({
      next: (res) => {
        this.isAuthenticate = res;
      },
    });
    this.isAuthenticate = this.authService.getIsAuth();
  }

  enableNew(): boolean {
    const allowedUser = ['engr', 'it-admin'];
    return allowedUser.includes(this.authService.getUserInfo().position);
  }
}
