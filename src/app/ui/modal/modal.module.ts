import { ModalComponent } from './modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, NgbModalModule],
})
export class ModalModule {}
