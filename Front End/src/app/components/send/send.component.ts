import { Component, OnInit } from '@angular/core';
import { AuthService, WalletService, TransactionService } from '../../services/index';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  profile = {};
  wallets = [];
  coins: any = {
    'btc': { 'coin_type': 'btc' }
    , 'bch': { 'coin_type': 'bch' }
    , 'ltc': { 'coin_type': 'ltc' }
    , 'eth': { 'coin_type': 'eth' }
    , 'debc': { 'coin_type': 'debc' }
    , 'xrp': { 'coin_type': 'xrp' }
  };
  constructor(
    private auth: AuthService
    , private walletService: WalletService
    , private tsService: TransactionService
    , private title: Title) {
    this.title.setTitle('Send Crypto');
  }

  ngOnInit() {
    this.getWallet();
  }
  getWallet() {
    this.walletService.getWallet().subscribe((res) => {
      if (res.status === 'success') {
        this.wallets = res.body.wallets;
        this.wallets = res.body.wallets;
        setTimeout(function () { $('ul.tabs').tabs(); }, 1000);
      }
      Materialize.toast(res.message, 4000);
    });
  }
  sendCrypto(cryptoObject: any) {
    const selF = this;
    this.tsService.sendMoney(cryptoObject).subscribe((res) => {
      if (res.status === 'success') {
        selF.coins[cryptoObject.coin_type] = { 'coin_type': cryptoObject.coin_type };
      }
      Materialize.toast(res.message, 3000);
    });
  }

}
