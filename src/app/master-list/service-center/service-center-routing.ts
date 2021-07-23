import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';
import { ServiceCenterCollectionComponent } from './containers/service-center-collection/service-center-collection.component';

export const routes: Routes = [
  {
    path: '',
    component: ServiceCenterLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceCenterCollectionComponent,
      },
    ],
  },
];
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class StationRoutingModule {}
