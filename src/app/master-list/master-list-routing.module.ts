import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as stationRoutes from './station/station-routing';
import * as dealerRoutes from './dealer/dealer-routing';
import * as serviceCenterRoutes from './service-center/service-center-routing';

const routes: Routes = [
  {
    path: 'stations',
    children: stationRoutes.routes,
  },
  {
    path: 'dealers',
    children: dealerRoutes.routes,
  },
  {
    path: 'service-centers',
    children: serviceCenterRoutes.routes,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterListRoutingModule {}
