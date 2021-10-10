import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/service/core.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  constructor(private coreService: CoreService) {}

  ngOnInit(): void {}

  logout() {
    this.coreService.logout();
  }

  appVersion(): string {
    return this.coreService.getAppVersion();
  }
}
