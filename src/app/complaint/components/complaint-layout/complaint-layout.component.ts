import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private complaintService: ComplaintService) {}

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
}
