import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { ComplaintService } from '../../complaint.service';

@Component({
  selector: 'app-complaint-layout',
  templateUrl: './complaint-layout.component.html',
  styleUrls: ['./complaint-layout.component.css'],
})
export class ComplaintLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private complaintService: ComplaintService, private authService: AuthService) {}

  ngOnInit(): void {
    this.complaintService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/complaint']);
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
