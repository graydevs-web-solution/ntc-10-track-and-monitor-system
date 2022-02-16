import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { accomplishmentReport, DELETE } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { AccomplishmentReportService } from '../../accomplishment-report.service';
import { AccomplishmentReport } from '../../models/accomplishment-report.model';

@Component({
  selector: 'app-accomplishment-report-entry',
  template: `
    <div class="d-flex">
      <div class="flex-grow-1">
        <a [routerLink]="[entry.id]" class="text-decoration-none">
          <div>{{ entry.description }}</div>
          <div>
            <small>
              <span class="font-weight-bold"> For the report of {{ getDateReport() }} </span>
            </small>
          </div>
        </a>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn sm btn-primary" (click)="download()">Download</button>
        <button class="btn btn sm btn-primary" (click)="open()">Remove</button>
      </div>
    </div>
  `,
  styleUrls: ['./accomplishment-report-entry.component.css'],
})
export class AccomplishmentReportEntryComponent implements OnInit {
  @Input() entry: AccomplishmentReport;

  constructor(private modalService: NgbModal, private accomplishmentReportService: AccomplishmentReportService) {}

  ngOnInit(): void {
    //
  }

  getDateReport(): string {
    const newDate = DateTime.local(this.entry.year, this.entry.month).toFormat('MMMM yyyy');
    return newDate;
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.id;
    modalRef.componentInstance.componentName = accomplishmentReport;
    modalRef.componentInstance.formMode = DELETE;
  }

  download() {
    this.accomplishmentReportService.generatePdf(this.entry.id.toString());
  }
}
