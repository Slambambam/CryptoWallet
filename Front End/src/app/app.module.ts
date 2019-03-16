import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard, GuestGuard, AdminGuard, AdminGuestGuard } from './guards';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthService, WalletService, UserService } from './services/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {
  DashboardComponent
  , TransactionComponent
  , SendComponent
  , ReceiveComponent
  , ProfileComponent
  , LoginComponent
  , RegisterComponent
  , TradeComponent
  , ForgotpasswordComponent
} from './components/index';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TransactionService } from './services/transaction.service';

import {
  AdminHomeComponent,
  AdminDashboardComponent,
  AdminProfileComponent,
  AdminUsersComponent,
  AdminLoginComponent,
  HeaderComponent as adminHeaderComponent,
  FooterComponent as adminFooterComponent,
  WalletComponent,
  TransactionsComponent,
  SettingsComponent,
  CoinComponent
} from './admin';
import { Payment } from './payments';
import { StripeFormComponent } from './payments/stripe';
import { CwService } from './services/cw.service';
// import { URLSearchParams } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransactionComponent,
    SendComponent,
    ReceiveComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminProfileComponent,
    AdminLoginComponent,
    adminHeaderComponent,
    adminFooterComponent,
    TradeComponent,
    ForgotpasswordComponent,
    SettingsComponent,
    WalletComponent,
    TransactionsComponent,
    CoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard
    , GuestGuard
    , AdminGuard
    , AdminGuestGuard
    , AuthService
    , WalletService
    , UserService
    , TransactionService
    , Payment
    , StripeFormComponent
    , HttpClient
    , CwService
    // , URLSearchParams
    , { provide: LocationStrategy, useClass: HashLocationStrategy },
    , { provide: APP_BASE_HREF, useValue: '/' }
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
