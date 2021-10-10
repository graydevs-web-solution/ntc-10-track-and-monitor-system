import { NavbarComponent } from './container/navbar/navbar.component';
import { AppComponent } from './container/app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './container/main/main.component';
import { ComplaintModule } from '../complaint/complaint.module';
import { SideNavbarItemComponent } from '../ui/side-navbar/side-navbar-item/side-navbar-item.component';
import { SideNavbarComponent } from '../ui/side-navbar/side-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StartComponent } from './components/start/start.component';
import { CardModule } from '../ui/card/card.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    MainComponent,
    SideNavbarComponent,
    SideNavbarItemComponent,
    StartComponent,
  ],
  imports: [CommonModule, RouterModule, NgbDropdownModule, ComplaintModule, FontAwesomeModule, CardModule],
})
export class CoreModule {}
