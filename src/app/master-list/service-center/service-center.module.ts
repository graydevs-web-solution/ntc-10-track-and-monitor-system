import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterLayoutComponent } from './components/service-center-layout/service-center-layout.component';
import { ServiceCenterCollectionComponent } from './containers/service-center-collection/service-center-collection.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServiceCenterLayoutComponent, ServiceCenterCollectionComponent],
  imports: [CommonModule, RouterModule],
})
export class ServiceCenterModule {}
