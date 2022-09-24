import { AccomplishmentReportCollectionComponent } from './containers/accomplishment-report-collection/accomplishment-report-collection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccomplishmentReportLayoutComponent } from './components/accomplishment-report-layout/accomplishment-report-layout.component';
import { AccomplishmentReportEntryComponent } from './components/accomplishment-report-entry/accomplishment-report-entry.component';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from '../ui/card/card.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccomplishmentReportRoutingModule } from './accomplishment-report-routing';
import { AccomplishmentReportListComponent } from './components/accomplishment-report-list/accomplishment-report-list.component';
import { AccomplishmentReportEditComponent } from './containers/accomplishment-report-edit/accomplishment-report-edit.component';

@NgModule({
  declarations: [
    AccomplishmentReportLayoutComponent,
    AccomplishmentReportEntryComponent,
    AccomplishmentReportListComponent,
    AccomplishmentReportLayoutComponent,
    AccomplishmentReportCollectionComponent,
    AccomplishmentReportEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccomplishmentReportRoutingModule,
    NgbModalModule,
    CardModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
  exports: [AccomplishmentReportEditComponent],
})
export class AccomplishmentReportModule {}
