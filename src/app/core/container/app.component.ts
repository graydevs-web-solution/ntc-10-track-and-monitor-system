import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SystemSettingService } from 'src/app/system-setting/system-setting.service';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticate = true;

  constructor(public coreService: CoreService, private authService: AuthService, private systemService: SystemSettingService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.systemService.getRegionalDirectorLocalStorage();
    this.systemService.getFormCountersLocalStorage();
    this.authService.getAuthListener().subscribe({
      next: (res) => {
        this.isAuthenticate = res;
      },
    });
    this.isAuthenticate = this.authService.getIsAuth();
  }
}
