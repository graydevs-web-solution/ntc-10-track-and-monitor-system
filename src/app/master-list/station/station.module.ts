import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationCollectionComponent } from './containers/station-collection/station-collection.component';
import { StationLayoutComponent } from './components/station-layout/station-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StationCollectionComponent, StationLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class StationModule {}
