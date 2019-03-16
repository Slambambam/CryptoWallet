import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DashboardComponent
  , TransactionComponent
  , SendComponent
  , ReceiveComponent
  , ProfileComponent
  , LoginComponent
  , RegisterComponent
  , HomeComponent
  , TradeComponent
  , ForgotpasswordComponent
} from './components/index';
import {
  AdminHomeComponent,
  AdminDashboardComponent,
  AdminProfileComponent,
  AdminUsersComponent,
  AdminLoginComponent,
  TransactionsComponent,
  WalletComponent,
  SettingsComponent,
  CoinComponent
} from './admin/index';

import { AuthGuard, GuestGuard, AdminGuard, AdminGuestGuard } from './guards';
import { AuthService } from './services/index';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [AdminGuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'forgotpassword', component: ForgotpasswordComponent, canActivate: [GuestGuard] },
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'profile', component: ProfileComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'receive', component: ReceiveComponent },
      { path: 'trade', component: TradeComponent },
      { path: 'send', component: SendComponent }
    ],
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'fiat/transactions', component: TransactionsComponent },
      { path: 'fiat/wallet', component: WalletComponent },
      { path: 'fiat/coin', component: CoinComponent },
      { path: 'settings', component: SettingsComponent }

    ],
    component: AdminHomeComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, HttpClientModule, AuthService]
})
export class AppRoutingModule { }
