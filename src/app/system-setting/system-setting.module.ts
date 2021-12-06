import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingComponent } from './container/system-setting/system-setting.component';
import { SystemSettingLayoutComponent } from './component/system-setting-layout/system-setting-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemSettingRoutingModule } from './system-setting-routing.module';

@NgModule({
  declarations: [SystemSettingComponent, SystemSettingLayoutComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, SystemSettingRoutingModule],
})
export class SystemSettingModule {}
