import { RadioTransceiverLayoutComponent } from './components/radio-transceiver-layout/radio-transceiver-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadioTransceiverEditComponent } from './containers/radio-transceiver-edit/radio-transceiver-edit.component';

const routes: Routes = [
  {
    path: '',
     component: RadioTransceiverLayoutComponent,
     children: [
       {
         path: '',
         component: RadioTransceiverEditComponent
       }
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioTransceiverRoutingModule { }
