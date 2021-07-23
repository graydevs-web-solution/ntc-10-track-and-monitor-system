import { ModalComponent } from './modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StationModule } from 'src/app/master-list/station/station.module';
import { RemoveMessageComponent } from './remove-message/remove-message.component';

@NgModule({
  declarations: [ModalComponent, RemoveMessageComponent],
  imports: [CommonModule, NgbModalModule, StationModule],
})
export class ModalModule {}
