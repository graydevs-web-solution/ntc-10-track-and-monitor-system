import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeficiencyNoticeLayoutComponent } from './components/deficiency-notice-layout/deficiency-notice-layout.component';
import { RouterModule } from '@angular/router';
import { NgbAlertModule, NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from '../ui/card/card.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeficiencyNoticeRoutingModule } from './deficiency-notice-routing.module';
import { DeficiencyNoticeListComponent } from './components/deficiency-notice-list/deficiency-notice-list.component';
import { DeficiencyNoticeEntryComponent } from './components/deficiency-notice-entry/deficiency-notice-entry.component';
import { DeficiencyNoticeCollectionComponent } from './containers/deficiency-notice-collection/deficiency-notice-collection.component';
import { DeficiencyNoticeEditComponent } from './containers/deficiency-notice-edit/deficiency-notice-edit.component';
import { DeficiencyNoticeViewComponent } from './containers/deficiency-notice-view/deficiency-notice-view.component';

@NgModule({
  declarations: [
    DeficiencyNoticeLayoutComponent,
    DeficiencyNoticeListComponent,
    DeficiencyNoticeEntryComponent,
    DeficiencyNoticeCollectionComponent,
    DeficiencyNoticeEditComponent,
    DeficiencyNoticeViewComponent,
  ],
  imports: [
    CommonModule,
    // NgbNavModule,
    DeficiencyNoticeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    // AutosizeModule,
    CardModule,
    RouterModule,
    NgbModalModule,
    NgbAlertModule,
  ],
})
export class DeficiencyNoticeModule {}
