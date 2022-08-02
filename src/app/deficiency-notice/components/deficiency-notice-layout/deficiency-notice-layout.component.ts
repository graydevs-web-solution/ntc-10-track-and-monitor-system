import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';

@Component({
  selector: 'app-deficiency-notice-layout',
  templateUrl: './deficiency-notice-layout.component.html',
  styleUrls: ['./deficiency-notice-layout.component.css'],
})
export class DeficiencyNoticeLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private dnService: DeficiencyNoticeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.dnService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/deficiency-notice']);
        break;
      default:
        await this.router.navigate(['/']);
        break;
    }
  }

  enableNew(): boolean {
    const allowedUser = ['legal', 'it-admin'];
    return allowedUser.includes(this.authService.getUserInfo().position);
  }
}
