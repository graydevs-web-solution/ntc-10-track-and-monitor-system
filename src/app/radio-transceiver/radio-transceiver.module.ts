import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioTransceiverEditComponent } from './containers/radio-transceiver-edit/radio-transceiver-edit.component';
import { RadioTransceiverRoutingModule } from './radio-transceiver-routing.module';
import { NgbDatepickerModule, NgbDateAdapter, NgbDateParserFormatter, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomAdapter, CustomDateParserFormatter } from '../shared/datepicker/datepicker-adapter';
import { RadioTransceiverLayoutComponent } from './components/radio-transceiver-layout/radio-transceiver-layout.component';

@NgModule({
  declarations: [
    RadioTransceiverEditComponent,
    RadioTransceiverLayoutComponent,
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    RadioTransceiverRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbNavModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class RadioTransceiverModule { }
