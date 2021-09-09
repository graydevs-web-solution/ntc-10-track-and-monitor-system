import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadioDealerLayoutComponent } from './components/radio-dealer-layout/radio-dealer-layout.component';
import { RadioDealerCollectionComponent } from './containers/radio-dealer-collection/radio-dealer-collection.component';
import { RadioDealerEditComponent } from './containers/radio-dealer-edit/radio-dealer-edit.component';
import { RadioDealerViewComponent } from './containers/radio-dealer-view/radio-dealer-view.component';

const routes: Routes = [
  {
    path: '',
    component: RadioDealerLayoutComponent,
    children: [
      {
        path: '',
        component: RadioDealerCollectionComponent,
      },
      {
        path: 'new',
        component: RadioDealerEditComponent,
      },
      {
        path: ':id',
        component: RadioDealerViewComponent,
      },
      {
        path: ':id/edit',
        component: RadioDealerEditComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadioDealerRoutingModule {}
