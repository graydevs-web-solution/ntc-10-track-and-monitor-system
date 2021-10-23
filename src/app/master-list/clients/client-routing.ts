import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { ClientCollectionComponent } from './containers/client-collection/client-collection.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ClientCollectionComponent,
      },
    ],
  },
];
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class StationRoutingModule {}
