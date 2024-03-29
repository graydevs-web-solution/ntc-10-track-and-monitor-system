import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreService } from 'src/app/core/service/core.service';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { MobilePhoneDealerService } from '../../mobile-phone-dealer.service';
@Component({
  selector: 'app-mobile-phone-dealer-layout',
  templateUrl: './mobile-phone-dealer-layout.component.html',
  styleUrls: ['./mobile-phone-dealer-layout.component.css'],
})
export class MobilePhoneDealerLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(
    private router: Router,
    private mpdService: MobilePhoneDealerService,
    private coreService: CoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.mpdService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/mobile-phone-dealer']);
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
