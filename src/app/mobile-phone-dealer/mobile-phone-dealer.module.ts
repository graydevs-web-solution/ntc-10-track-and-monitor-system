import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilePhoneDealerEditComponent } from './containers/mobile-phone-dealer-edit/mobile-phone-dealer-edit.component';
import { MobilePhoneDealerRoutingModule } from './mobile-phone-dealer-routing.module';
import { NgbNavModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AutosizeModule} from 'ngx-autosize';
import { MobilePhoneDealerLayoutComponent } from './components/mobile-phone-dealer-layout/mobile-phone-dealer-layout.component';
import { MobilePhoneDealerCollectionComponent } from './containers/mobile-phone-dealer-collection/mobile-phone-dealer-collection.component';
import { MobilePhoneDealerListComponent } from './components/mobile-phone-dealer-list/mobile-phone-dealer-list.component';
import { MobilePhoneDealerEntryComponent } from './components/mobile-phone-dealer-entry/mobile-phone-dealer-entry.component';
import { CardModule } from '../ui/card/card.module';

@NgModule({
  declarations: [
    MobilePhoneDealerEditComponent,
    MobilePhoneDealerLayoutComponent,
    MobilePhoneDealerCollectionComponent,
    MobilePhoneDealerListComponent,
    MobilePhoneDealerEntryComponent
  ],
  imports: [
    CommonModule,
    MobilePhoneDealerRoutingModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    AutosizeModule,
    CardModule
  ]
})
export class MobilePhoneDealerModule { }
