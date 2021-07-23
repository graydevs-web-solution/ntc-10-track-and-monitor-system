import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerCollectionComponent } from './containers/dealer-collection/dealer-collection.component';
import { RouterModule } from '@angular/router';
import { DealerLayoutComponent } from './components/dealer-layout/dealer-layout.component';

@NgModule({
  declarations: [DealerCollectionComponent, DealerLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class DealerModule {}
