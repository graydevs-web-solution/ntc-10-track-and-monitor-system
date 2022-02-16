import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { accomplishmentReport, ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { AccomplishmentReportService } from '../../accomplishment-report.service';

@Component({
  selector: 'app-accomplishment-report-layout',
  templateUrl: './accomplishment-report-layout.component.html',
  styleUrls: ['./accomplishment-report-layout.component.css'],
})
export class AccomplishmentReportLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private accomplishmentReportService: AccomplishmentReportService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.accomplishmentReportService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/accomplishment-report']);
        break;
      default:
        await this.router.navigate(['/']);
        break;
    }
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = accomplishmentReport;
    modalRef.componentInstance.formMode = ADD;
  }
}
