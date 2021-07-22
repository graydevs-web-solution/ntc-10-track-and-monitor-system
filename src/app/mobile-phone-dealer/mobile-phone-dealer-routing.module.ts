import { MobilePhoneDealerLayoutComponent } from './components/mobile-phone-dealer-layout/mobile-phone-dealer-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobilePhoneDealerEditComponent } from './containers/mobile-phone-dealer-edit/mobile-phone-dealer-edit.component';

const routes: Routes = [
  {
    path: '',
     component: MobilePhoneDealerLayoutComponent,
     children: [
       {
         path: '',
         component: MobilePhoneDealerEditComponent
       }
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobilePhoneDealerRoutingModule { }
