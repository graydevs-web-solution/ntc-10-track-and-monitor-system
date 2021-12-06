import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { StartComponent } from './core/components/start/start.component';
import { MainComponent } from './core/container/main/main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'radio-transceiver',
  //   pathMatch: 'full',
  // },
  {
    path: 'home',
    component: StartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'complaint',
    loadChildren: () => import('./complaint/complaint.module').then((m) => m.ComplaintModule),
  },
  {
    path: 'deficiency-notice',
    loadChildren: () => import('./deficiency-notice/deficiency-notice.module').then((m) => m.DeficiencyNoticeModule),
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
    path: 'radio-dealer',
    loadChildren: () => import('./radio-dealer/radio-dealer.module').then((m) => m.RadioDealerModule),
  },
  {
    path: 'master-list',
    loadChildren: () => import('./master-list/master-list.module').then((m) => m.MasterListModule),
  },
  {
    path: 'system-setting',
    loadChildren: () => import('./system-setting/system-setting.module').then((m) => m.SystemSettingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
