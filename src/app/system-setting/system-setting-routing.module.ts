import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SystemSettingLayoutComponent } from './component/system-setting-layout/system-setting-layout.component';
import { SystemSettingComponent } from './container/system-setting/system-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SystemSettingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingRoutingModule {}
