import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AccountSettingLayoutComponent } from './components/account-setting-layout/account-setting-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingLayoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingsRoutingModule {}
