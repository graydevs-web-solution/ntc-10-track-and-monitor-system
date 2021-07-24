import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';
import { ServiceCenterCollectionComponent } from './containers/service-center-collection/service-center-collection.component';
import { RouterModule } from '@angular/router';
import { ServiceCenterEntryComponent } from './components/service-center-entry/service-center-entry.component';
import { ServiceCenterListComponent } from './components/service-center-list/service-center-list.component';
import { ServiceCenterEditComponent } from './containers/service-center-edit/service-center-edit.component';
import { ServiceCenterViewComponent } from './containers/service-center-view/service-center-view.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'src/app/ui/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServiceCenterLayoutComponent,
    ServiceCenterCollectionComponent,
    ServiceCenterEntryComponent,
    ServiceCenterListComponent,
    ServiceCenterEditComponent,
    ServiceCenterViewComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModalModule, CardModule, FormsModule, ReactiveFormsModule],
  exports: [ServiceCenterEditComponent, ServiceCenterViewComponent],
})
export class ServiceCenterModule {}
