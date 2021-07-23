import { RadioTransceiverLayoutComponent } from './components/radio-transceiver-layout/radio-transceiver-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadioTransceiverEditComponent } from './containers/radio-transceiver-edit/radio-transceiver-edit.component';
import { RadioTransceiverCollectionComponent } from './containers/radio-transceiver-collection/radio-transceiver-collection.component';
import { RadioTransceiverViewComponent } from './containers/radio-transceiver-view/radio-transceiver-view.component';

const routes: Routes = [
  {
    path: '',
    component: RadioTransceiverLayoutComponent,
    children: [
      {
        path: '',
        component: RadioTransceiverCollectionComponent,
      },
      {
        path: 'new',
        component: RadioTransceiverEditComponent,
      },
      {
        path: ':id',
        component: RadioTransceiverViewComponent,
      },
      {
        path: ':id/edit',
        component: RadioTransceiverEditComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadioTransceiverRoutingModule {}
