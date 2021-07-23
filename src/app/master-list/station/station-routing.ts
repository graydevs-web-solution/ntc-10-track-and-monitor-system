import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationLayoutComponent } from './components/station-layout/station-layout.component';
import { StationCollectionComponent } from './containers/station-collection/station-collection.component';

export const routes: Routes = [
  {
    path: '',
    component: StationLayoutComponent,
    children: [
      {
        path: '',
        component: StationCollectionComponent,
      },
    ],
  },
];
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class StationRoutingModule {}
