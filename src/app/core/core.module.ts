import { NavbarComponent } from './container/navbar/navbar.component';
import { AppComponent } from './container/app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LayoutComponent],
  imports: [CommonModule, RouterModule, NgbDropdownModule],
})
export class CoreModule {}
