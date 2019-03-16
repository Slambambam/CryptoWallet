import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService, WalletService } from '../../services/index';
import { Title } from '@angular/platform-browser';
// import '../../../assets/js/materialize.min.js';
declare var Materialize: any;
declare var $: any;
@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
  profile = {};
  wallets = [];
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  constructor(private auth: AuthService, private walletService: WalletService, private title: Title) {
    this.title.setTitle('Receive Crypto');
    this.getWallet();
  }

  getWallet() {
    this.walletService.getWallet().subscribe((res) => {
      if (res.status === 'success') {
        this.wallets = res.body.wallets;
        setTimeout(function () { $('ul.tabs').tabs(); }, 1000);
      }
      Materialize.toast(res.message, 4000);
    });
  }
  refresWallet() {
    this.walletService.refresWallet().subscribe((res) => {
      if (res.status === 'success') {
        this.wallets = res.body.wallets;
        setTimeout(function () { $('ul.tabs').tabs(); }, 1000);
      }
      Materialize.toast(res.message, 4000);
    });
  }

}
