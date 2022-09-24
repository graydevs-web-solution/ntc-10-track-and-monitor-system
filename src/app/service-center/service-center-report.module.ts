import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterReportEditComponent } from './containers/service-center-report-edit/service-center-report-edit.component';
import { ServiceCenterRoutingModule } from './service-center-routing.module';
import { NgbNavModule, NgbDatepickerModule, NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';
import { ServiceCenterReportCollectionComponent } from './containers/service-center-report-collection/service-center-report-collection.component';
import { ServiceCenterReportListComponent } from './components/service-center-report-list/service-center-report-list.component';
import { ServiceCenterReportEntryComponent } from './components/service-center-report-entry/service-center-report-entry.component';
import { CardModule } from '../ui/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceCenterReportViewComponent } from './containers/service-center-report-view/service-center-report-view.component';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ServiceCenterReportEditComponent,
    ServiceCenterLayoutComponent,
    ServiceCenterReportCollectionComponent,
    ServiceCenterReportListComponent,
    ServiceCenterReportEntryComponent,
    ServiceCenterReportViewComponent,
  ],
  imports: [
    CommonModule,
    ServiceCenterRoutingModule,
    NgbNavModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModalModule,
    NgbAlertModule,
    NgbPaginationModule,
  ],
})
export class ServiceCenterReportModule {}
