import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationCollectionComponent } from './containers/station-collection/station-collection.component';
import { StationLayoutComponent } from './components/station-layout/station-layout.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/ui/card/card.module';
import { StationListComponent } from './components/station-list/station-list.component';
import { StationEntryComponent } from './components/station-entry/station-entry.component';
import { StationEditComponent } from './containers/station-edit/station-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StationViewComponent } from './containers/station-view/station-view.component';

@NgModule({
  declarations: [
    StationCollectionComponent,
    StationLayoutComponent,
    StationListComponent,
    StationEntryComponent,
    StationEditComponent,
    StationViewComponent,
  ],
  imports: [CommonModule, RouterModule, CardModule, FormsModule, ReactiveFormsModule, NgbModalModule],
  exports: [StationEditComponent, StationViewComponent],
})
export class StationModule {}
