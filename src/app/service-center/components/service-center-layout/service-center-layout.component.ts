import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { ServiceCenterReportService } from '../../service-center-report.service';

@Component({
  selector: 'app-service-center-layout',
  templateUrl: './service-center-layout.component.html',
  styleUrls: ['./service-center-layout.component.css'],
})
export class ServiceCenterLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private scService: ServiceCenterReportService) {}

  ngOnInit(): void {
    this.scService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/service-center']);
        break;
      default:
        await this.router.navigate(['/']);
        break;
    }
  }
}
