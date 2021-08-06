import { ModalComponent } from './modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StationModule } from 'src/app/master-list/station/station.module';
import { RemoveMessageComponent } from './remove-message/remove-message.component';
import { ServiceCenterModule } from 'src/app/master-list/service-center/service-center.module';
import { DealerModule } from 'src/app/master-list/dealer/dealer.module';
import { ClientModule } from './../../master-list/clients/client.module';

@NgModule({
  declarations: [ModalComponent, RemoveMessageComponent],
  imports: [CommonModule, NgbModalModule, StationModule, ServiceCenterModule, DealerModule, ClientModule],
})
export class ModalModule {}
