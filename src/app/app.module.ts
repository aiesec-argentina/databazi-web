import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { GrowlModule } from 'primeng/primeng';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { routes } from './app.routing';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { LandingPageMenuModule } from './landing-page-menu/landing-page-menu.module';
import { LandingFooterModule } from './landing-footer/landing-footer.module';
import { FileValueAccessorDirective } from './file-control-value-accessor.directive';
import { FileValidatorDirective } from './file-input-validator.directive';
import { LandingPageHostComponent } from './landing-page-host/landing-page-host.component';

import { FormHostModule } from "./form-host/form-host.module";
import { LandingPageHostModule } from './landing-page-host/landing-page-host.module';
import { ContactListComponent } from './contact-list/contact-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Injectable() export class BaluHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: 6
    },
    pinch: {
      enable: false
    },
    rotate: {
      enable: false
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FileValueAccessorDirective,
    FileValidatorDirective,
    LandingPageHostComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    routes,
    DragScrollModule,
    BrowserModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    TranslateModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LandingPageMenuModule,
    LandingFooterModule,
    FormHostModule,
    LandingPageHostModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: BaluHammerConfig
    },
    {
      provide: LOCALE_ID,
      useValue: 'en'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
