import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerLayoutComponent } from './components/dealer-layout/dealer-layout.component';
import { DealerCollectionComponent } from './containers/dealer-collection/dealer-collection.component';

export const routes: Routes = [
  {
    path: '',
    component: DealerLayoutComponent,
    children: [
      {
        path: '',
        component: DealerCollectionComponent,
      },
    ],
  },
];
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class StationRoutingModule {}
