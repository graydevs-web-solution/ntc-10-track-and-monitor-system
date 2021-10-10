import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintLayoutComponent } from './components/complaint-layout/complaint-layout.component';
import { ComplaintCollectionComponent } from './containers/complaint-collection/complaint-collection.component';
import { ComplaintEditComponent } from './containers/complaint-edit/complaint-edit.component';
import { ComplaintViewComponent } from './containers/complaint-view/complaint-view.component';

const routes: Routes = [
  {
    path: '',
    component: ComplaintLayoutComponent,
    children: [
      {
        path: '',
        component: ComplaintCollectionComponent,
      },
      {
        path: 'new',
        component: ComplaintEditComponent,
      },
      {
        path: ':id',
        component: ComplaintViewComponent,
      },
      {
        path: ':id/edit',
        component: ComplaintEditComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintRoutingModule {}
