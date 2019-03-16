import { Component, OnInit } from '@angular/core';
import { AuthService, WalletService } from '../../services/index';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile = {};
  wallets = [];
  constructor(private auth: AuthService, private walletService: WalletService, private title: Title) {
    this.title.setTitle('Dashboard');
    this.profile = this.auth.getUser();
  }
  ngOnInit() {
    this.getWallet();
  }
  

  getWallet() {
    this.walletService.getWallet().subscribe((res) => {
      if (res.status === 'success') {
        this.wallets = res.body.wallets;
      }
      // Materialize.toast(res.message, 4000);
    });
  }
}
