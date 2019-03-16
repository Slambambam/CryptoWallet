import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WalletService } from '../../../services';
declare var Materialize: any;
declare var $: any;
@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {
  myform: FormGroup;
  coins = [];
  coinObj: any = {};

  get coin() { return this.myform.get('coin'); }
  get sell_amount() { return this.myform.get('sell_amount'); }
  get buy_amount() { return this.myform.get('buy_amount'); }
  constructor(private wsService: WalletService) { }

  ngOnInit() {
    this.myform = new FormGroup({
      'coin': new FormControl('', [
        Validators.required
      ]),
      'sell_amount': new FormControl('', [
        Validators.required
      ]),
      'buy_amount': new FormControl('', [
        Validators.required
      ])
    });
    this.getCurrencyLookup();
  }
  getCurrencyLookup() {
    this.wsService.getCurrencyLookup().subscribe((res) => {
      this.coins = res.body.currencyLookup;
    });
  }
  updateCryptoLookup() {
    if (!this.myform.valid) { Materialize.toast('Invalid Form', 3000); }
    this.wsService.updateCurrencyLookup(this.coinObj).subscribe((res) => {
      Materialize.toast(res.message, 3000);
    });
  }

}
