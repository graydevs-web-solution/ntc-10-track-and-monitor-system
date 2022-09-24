import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioTransceiverEditComponent } from './containers/radio-transceiver-edit/radio-transceiver-edit.component';
import { RadioTransceiverRoutingModule } from './radio-transceiver-routing.module';
import {
  NgbDatepickerModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbNavModule,
  NgbAlertModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomAdapter, CustomDateParserFormatter } from '../shared/datepicker/datepicker-adapter';
import { RadioTransceiverLayoutComponent } from './components/radio-transceiver-layout/radio-transceiver-layout.component';
import { RadioTransceiverCollectionComponent } from './containers/radio-transceiver-collection/radio-transceiver-collection.component';
import { CardModule } from '../ui/card/card.module';
import { RadioTransceiverViewComponent } from './containers/radio-transceiver-view/radio-transceiver-view.component';
import { RouterModule } from '@angular/router';
import { RadioTransceiverListComponent } from './components/radio-transceiver-list/radio-transceiver-list.component';
import { RadioTransceiverEntryComponent } from './components/radio-transceiver-entry/radio-transceiver-entry.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    RadioTransceiverEditComponent,
    RadioTransceiverLayoutComponent,
    RadioTransceiverCollectionComponent,
    RadioTransceiverViewComponent,
    RadioTransceiverListComponent,
    RadioTransceiverEntryComponent,
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    RadioTransceiverRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbNavModule,
    CardModule,
    RouterModule,
    NgbModalModule,
    NgbAlertModule,
    NgbPaginationModule,
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class RadioTransceiverModule {}
