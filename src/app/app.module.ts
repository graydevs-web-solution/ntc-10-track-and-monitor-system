import { ServiceCenterModule } from './service-center/service-center.module';
import { CoreModule } from './core/core.module';
import { MobilePhoneDealerModule } from './mobile-phone-dealer/mobile-phone-dealer.module';
import { RadioTransceiverModule } from './radio-transceiver/radio-transceiver.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/container/app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardModule } from './ui/card/card.module';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadioTransceiverModule,
    FontAwesomeModule,
    MobilePhoneDealerModule,
    CoreModule,
    ServiceCenterModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
