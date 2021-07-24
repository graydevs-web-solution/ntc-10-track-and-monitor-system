import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerCollectionComponent } from './containers/dealer-collection/dealer-collection.component';
import { RouterModule } from '@angular/router';
import { DealerLayoutComponent } from './components/dealer-layout/dealer-layout.component';
import { DealerEntryComponent } from './components/dealer-entry/dealer-entry.component';
import { DealerListComponent } from './components/dealer-list/dealer-list.component';
import { DealerEditComponent } from './containers/dealer-edit/dealer-edit.component';
import { DealerViewComponent } from './containers/dealer-view/dealer-view.component';
import { CardModule } from 'src/app/ui/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DealerCollectionComponent,
    DealerLayoutComponent,
    DealerEntryComponent,
    DealerListComponent,
    DealerEditComponent,
    DealerViewComponent,
  ],
  imports: [CommonModule, RouterModule, CardModule, FormsModule, ReactiveFormsModule, NgbModalModule],
  exports: [DealerEditComponent, DealerViewComponent],
})
export class DealerModule {}
