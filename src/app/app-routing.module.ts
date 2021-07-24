import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'radio-transceiver',
    pathMatch: 'full',
  },
  {
    path: 'radio-transceiver',
    loadChildren: () => import('./radio-transceiver/radio-transceiver.module').then((m) => m.RadioTransceiverModule),
  },
  {
    path: 'mobile-phone-dealer',
    loadChildren: () => import('./mobile-phone-dealer/mobile-phone-dealer.module').then((m) => m.MobilePhoneDealerModule),
  },
  {
    path: 'service-center',
    loadChildren: () => import('./service-center/service-center-report.module').then((m) => m.ServiceCenterReportModule),
  },
  {
    path: 'master-list',
    loadChildren: () => import('./master-list/master-list.module').then((m) => m.MasterListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
