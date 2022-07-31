import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LIST } from 'src/app/shared/constants';

@Component({
  selector: 'app-account-setting-layout',
  templateUrl: './account-setting-layout.component.html',
  styleUrls: ['./account-setting-layout.component.css'],
})
export class AccountSettingLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
}
