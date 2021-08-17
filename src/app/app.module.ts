import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { UserTimeSheetModule } from './views/user-time-sheet/user-time-sheet.module';
import { UserRegisterModule } from './views/user-register/user-register.module';
import { UserListModule } from './views/user-list/user-list.module';
import { ClientListModule } from './views/client-list/client-list.module';
import { ClientRegisterModule } from './views/client-register/client-register.module';
import { InventaryListModule } from './views/inventary-list/inventary-list.module';
import { ProcvModule } from './views/procv/procv.module';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ModalsModule } from './modals/modals.module';
import { InventaryRegisterModule } from './views/inventary-register/inventary-register.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCurrencyModule } from 'ngx-currency';
import { LeftPadComponent } from './views/left-pad/left-pad.component';
import { LeftPadModule } from './views/left-pad/left-pad.module';
import { ClipboardModule } from 'ngx-clipboard';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(options),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    UserTimeSheetModule,
    UserRegisterModule,
    UserListModule,
    ClientListModule,
    ClientRegisterModule,
    InventaryListModule,
    InventaryRegisterModule,
    ProcvModule,
    ModalsModule,
    NgSelectModule,
    NgxCurrencyModule,
    LeftPadModule,
    ClipboardModule,
    
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
  ],
  
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
