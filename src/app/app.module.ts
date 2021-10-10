import { ModalModule } from './ui/modal/modal.module';
import { CoreModule } from './core/core.module';
import { MobilePhoneDealerModule } from './mobile-phone-dealer/mobile-phone-dealer.module';
import { RadioTransceiverModule } from './radio-transceiver/radio-transceiver.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/container/app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardModule } from './ui/card/card.module';
import { MasterListModule } from './master-list/master-list.module';
import { ServiceCenterReportModule } from './service-center/service-center-report.module';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadioTransceiverModule,
    FontAwesomeModule,
    MobilePhoneDealerModule,
    CoreModule,
    ServiceCenterReportModule,
    CardModule,
    ModalModule,
    MasterListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  declarations: [],
})
export class AppModule {}
