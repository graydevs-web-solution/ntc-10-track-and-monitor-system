import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreService } from 'src/app/core/service/core.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  userTypes = [];
  userPosition = '';
  private claims = [
    'radio-transceiver',
    'mobile-phone-dealer',
    'service-center',
    'radio-dealer',
    'deficiency-notice',
    'complaint',
    'users',
  ];
  // private userTypes: UserType[] = [
  //   { value: 'engr', label: 'Engineer' },
  //   { value: 'chf-engr', label: 'Chief Engineer' },
  //   { value: 'legal', label: 'Legal' },
  //   { value: 'director', label: 'Director' },
  //   { value: 'it-admin', label: 'IT Admin' },
  // ];

  constructor(private coreService: CoreService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userTypes = this.authService.getUserTypes();
    this.userPosition = this.authService.getUserInfo().position;
    console.log(this.userPosition);
  }

  logout() {
    this.authService.logoutUser();
  }

  appVersion(): string {
    return this.coreService.getAppVersion();
  }

  isAllowedInspection() {
    const allowedUser = ['engr', 'chf-engr', 'legal', 'director', 'it-admin'];

    return allowedUser.includes(this.userPosition);
  }

  isAllowedReports() {
    const allowedUser = ['chf-engr', 'legal', 'director', 'it-admin'];

    return allowedUser.includes(this.userPosition);
  }

  isAllowedAccomplishment() {
    const allowedUser = ['legal', 'it-admin'];

    return allowedUser.includes(this.userPosition);
  }

  isAllowedSystemSettings() {
    const allowedUser = ['it-admin'];

    return allowedUser.includes(this.userPosition);
  }
}
