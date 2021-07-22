import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCenterReportEditComponent } from './containers/service-center-report-edit/service-center-report-edit.component';
import { ServiceCenterReportCollectionComponent } from
  './containers/service-center-report-collection/service-center-report-collection.component';


const routes: Routes = [
  {
    path: '',
     component: ServiceCenterLayoutComponent,
     children: [
       {
         path: '',
         component: ServiceCenterReportCollectionComponent
       },
        {
         path: 'new',
         component: ServiceCenterReportEditComponent
       }
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCenterRoutingModule { }
