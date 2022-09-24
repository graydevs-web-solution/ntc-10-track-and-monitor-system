import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbAlertModule, NgbDatepickerModule, NgbModalModule, NgbPaginationModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from '../ui/card/card.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintRoutingModule } from './complaint-routing';
import { ComplaintEntryComponent } from './components/complaint-entry/complaint-entry.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintLayoutComponent } from './components/complaint-layout/complaint-layout.component';
import { ComplaintCollectionComponent } from './containers/complaint-collection/complaint-collection.component';
import { ComplaintEditComponent } from './containers/complaint-edit/complaint-edit.component';
import { ComplaintViewComponent } from './containers/complaint-view/complaint-view.component';

@NgModule({
  declarations: [
    ComplaintEntryComponent,
    ComplaintListComponent,
    ComplaintLayoutComponent,
    ComplaintCollectionComponent,
    ComplaintEditComponent,
    ComplaintViewComponent,
  ],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    RouterModule,
    NgbDatepickerModule,
    NgbModalModule,
    CardModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTimepickerModule,
    NgbAlertModule,
    NgbPaginationModule,
  ],
})
export class ComplaintModule {}
