import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationModule } from './station/station.module';
import { MasterListRoutingModule } from './master-list-routing.module';
import { DealerModule } from './dealer/dealer.module';
import { ServiceCenterModule } from './service-center/service-center.module';
import { ClientModule } from './clients/client.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, StationModule, MasterListRoutingModule, DealerModule, ServiceCenterModule, ClientModule],
})
export class MasterListModule {}
