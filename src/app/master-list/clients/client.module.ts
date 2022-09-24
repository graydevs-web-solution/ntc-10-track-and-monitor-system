import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCollectionComponent } from './containers/client-collection/client-collection.component';
import { RouterModule } from '@angular/router';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { ClientEntryComponent } from './components/client-entry/client-entry.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientEditComponent } from './containers/client-edit/client-edit.component';
import { ClientViewComponent } from './containers/client-view/client-view.component';
import { CardModule } from 'src/app/ui/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ClientSearchComponent } from './components/client-search/client-search.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ClientCollectionComponent,
    ClientLayoutComponent,
    ClientEntryComponent,
    ClientListComponent,
    ClientEditComponent,
    ClientViewComponent,
    ClientSearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    NgbPaginationModule,
  ],
  exports: [ClientEditComponent, ClientViewComponent, ClientSearchComponent],
})
export class ClientModule {}
