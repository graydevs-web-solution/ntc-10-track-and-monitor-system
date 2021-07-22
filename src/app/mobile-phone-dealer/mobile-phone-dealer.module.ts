import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilePhoneDealerEditComponent } from './containers/mobile-phone-dealer-edit/mobile-phone-dealer-edit.component';
import { MobilePhoneDealerRoutingModule } from './mobile-phone-dealer-routing.module';
import { NgbNavModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AutosizeModule} from 'ngx-autosize';
import { MobilePhoneDealerLayoutComponent } from './components/mobile-phone-dealer-layout/mobile-phone-dealer-layout.component';

@NgModule({
  declarations: [
    MobilePhoneDealerEditComponent,
    MobilePhoneDealerLayoutComponent
  ],
  imports: [
    CommonModule,
    MobilePhoneDealerRoutingModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    AutosizeModule
  ]
})
export class MobilePhoneDealerModule { }
