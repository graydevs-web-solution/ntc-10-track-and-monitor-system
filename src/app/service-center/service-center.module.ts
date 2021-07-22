import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterReportEditComponent } from './containers/service-center-report-edit/service-center-report-edit.component';
import { ServiceCenterRoutingModule } from './service-center-routing.module';
import { NgbNavModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';

@NgModule({
  declarations: [
    ServiceCenterReportEditComponent,
    ServiceCenterLayoutComponent
  ],
  imports: [
    CommonModule,
    ServiceCenterRoutingModule,
    NgbNavModule,
    NgbDatepickerModule,
    FontAwesomeModule
  ]
})
export class ServiceCenterModule { }
