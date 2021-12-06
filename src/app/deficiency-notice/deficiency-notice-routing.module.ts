import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DeficiencyNoticeLayoutComponent } from './components/deficiency-notice-layout/deficiency-notice-layout.component';
import { DeficiencyNoticeCollectionComponent } from './containers/deficiency-notice-collection/deficiency-notice-collection.component';
import { DeficiencyNoticeEditComponent } from './containers/deficiency-notice-edit/deficiency-notice-edit.component';
import { DeficiencyNoticeViewComponent } from './containers/deficiency-notice-view/deficiency-notice-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeficiencyNoticeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DeficiencyNoticeCollectionComponent,
      },
      {
        path: 'new',
        component: DeficiencyNoticeEditComponent,
      },
      {
        path: ':id',
        component: DeficiencyNoticeViewComponent,
      },
      {
        path: ':id/edit',
        component: DeficiencyNoticeEditComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeficiencyNoticeRoutingModule {}
