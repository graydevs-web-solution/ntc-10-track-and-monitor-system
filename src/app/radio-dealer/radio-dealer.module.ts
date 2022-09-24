import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioDealerRoutingModule } from './radio-dealer-routing.module';
import { NgbNavModule, NgbDatepickerModule, NgbModalModule, NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutosizeModule } from 'ngx-autosize';
import { CardModule } from '../ui/card/card.module';
import { RouterModule } from '@angular/router';
import { RadioDealerEditComponent } from './containers/radio-dealer-edit/radio-dealer-edit.component';
import { RadioDealerLayoutComponent } from './components/radio-dealer-layout/radio-dealer-layout.component';
import { RadioDealerCollectionComponent } from './containers/radio-dealer-collection/radio-dealer-collection.component';
import { RadioDealerEntryComponent } from './components/radio-dealer-entry/radio-dealer-entry.component';
import { RadioDealerViewComponent } from './containers/radio-dealer-view/radio-dealer-view.component';
import { RadioDealerListComponent } from './components/radio-dealer-list/radio-dealer-list.component';

@NgModule({
  declarations: [
    RadioDealerEditComponent,
    RadioDealerLayoutComponent,
    RadioDealerCollectionComponent,
    RadioDealerListComponent,
    RadioDealerEntryComponent,
    RadioDealerViewComponent,
  ],
  imports: [
    CommonModule,
    RadioDealerRoutingModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    AutosizeModule,
    CardModule,
    RouterModule,
    NgbModalModule,
    NgbAlertModule,
    NgbPaginationModule,
  ],
})
export class RadioDealerModule {}
