import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingLayoutComponent } from './components/account-setting-layout/account-setting-layout.component';
import { SignatureComponent } from './containers/signature/signature.component';
import { CardModule } from '../ui/card/card.module';

@NgModule({
  declarations: [AccountSettingLayoutComponent, SignatureComponent],
  imports: [CommonModule, AccountSettingsRoutingModule, CardModule],
})
export class AccountSettingsModule {}
