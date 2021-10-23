import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCenterReportEditComponent } from './containers/service-center-report-edit/service-center-report-edit.component';
import { ServiceCenterReportCollectionComponent } from './containers/service-center-report-collection/service-center-report-collection.component';
import { ServiceCenterReportViewComponent } from './containers/service-center-report-view/service-center-report-view.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ServiceCenterLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ServiceCenterReportCollectionComponent,
      },
      {
        path: 'new',
        component: ServiceCenterReportEditComponent,
      },
      {
        path: ':id',
        component: ServiceCenterReportViewComponent,
      },
      {
        path: ':id/edit',
        component: ServiceCenterReportEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCenterRoutingModule {}
