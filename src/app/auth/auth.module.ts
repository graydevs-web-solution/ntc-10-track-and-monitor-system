import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { UserEditComponent } from './containers/user-edit/user-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardModule } from '../ui/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { UserCollectionComponent } from './containers/user-collection/user-collection.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UserEntryComponent } from './component/user-entry/user-entry.component';
import { UserSearchComponent } from './containers/user-search/user-search.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,
    UserEditComponent,
    AuthLayoutComponent,
    UserListComponent,
    UserCollectionComponent,
    UserEntryComponent,
    UserSearchComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    NgbTypeaheadModule,
  ],
  exports: [UserEditComponent, UserSearchComponent],
})
export class AuthModule {}
