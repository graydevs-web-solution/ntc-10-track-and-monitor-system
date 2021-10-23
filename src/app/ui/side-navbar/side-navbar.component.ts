import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreService } from 'src/app/core/service/core.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  constructor(private coreService: CoreService, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logoutUser();
  }

  appVersion(): string {
    return this.coreService.getAppVersion();
  }
}
