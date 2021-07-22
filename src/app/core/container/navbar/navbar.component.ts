import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreService } from '../../service/core.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  appVersion: string;
  logoImagePath = 'assets/images/logo.png';
  collapsed = true;

  constructor(private coreService: CoreService) {}

  ngOnInit(): void {
    this.appVersion = this.coreService.getAppVersion();
  }
}
