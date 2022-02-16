import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AccomplishmentReportLayoutComponent } from './components/accomplishment-report-layout/accomplishment-report-layout.component';
import { AccomplishmentReportCollectionComponent } from './containers/accomplishment-report-collection/accomplishment-report-collection.component';

const routes: Routes = [
  {
    path: '',
    component: AccomplishmentReportLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccomplishmentReportCollectionComponent,
      },
      // {
      //   path: 'new',
      //   component: ComplaintEditComponent,
      // },
      // {
      //   path: ':id',
      //   component: ComplaintViewComponent,
      // },
      // {
      //   path: ':id/edit',
      //   component: ComplaintEditComponent,
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccomplishmentReportRoutingModule {}
