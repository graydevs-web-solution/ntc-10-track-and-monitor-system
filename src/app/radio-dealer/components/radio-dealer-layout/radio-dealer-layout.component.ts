import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { AuthService } from 'src/app/auth/auth.service';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { RadioDealerService } from '../../radio-dealer.service';
@Component({
  selector: 'app-radio-dealer-layout',
  templateUrl: './radio-dealer-layout.component.html',
  styleUrls: ['./radio-dealer-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioDealerLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private rdService: RadioDealerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.rdService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/radio-dealer']);
        break;
      default:
        await this.router.navigate(['/']);
        break;
    }
  }

  enableNew(): boolean {
    const allowedUser = ['engr', 'it-admin'];
    return allowedUser.includes(this.authService.getUserInfo().position);
  }
}
