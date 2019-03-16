import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Payment } from '../../payments/index';
import { CwService } from '../../services/cw.service';
declare let paypal: any;
declare let Materialize: any;
declare let $: any;
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  options: any = {
    cardNumber: FormControl,
    expiryMonth: FormControl,
    expiryYear: FormControl,
    cvc: FormControl,
    amount: FormControl
  };
  withdrawAmount;
  cryptoType = 'btc';
  sellCryptoType = 'btc';
  buyAmount;
  sellAmount;
  myform: FormGroup;
  toggleDepositDiv: Boolean = true;
  amountInWallet;
  currencies; selectedBuyCryptoAmount;
  selectedSellCryptoAmount = 0;
  transactions: any = [];
  constructor(
    private auth: AuthService
    , private router: Router
    , private title: Title
    , private payment: Payment
    , private cwService: CwService
  ) {
    this.title.setTitle('Trade');
  }
  toggleDeposit() {
    this.toggleDepositDiv = !this.toggleDepositDiv;
  }
  fetchCryptoAmount() {
    let selectedSellCryptoAmount = this.currencies.filter((item) => {
      return this.sellCryptoType === item.coin;
    });
    this.selectedSellCryptoAmount = selectedSellCryptoAmount[0].sell_amount;
    selectedSellCryptoAmount = this.currencies.filter((item) => {
      return this.cryptoType === item.coin;
    });
    this.selectedBuyCryptoAmount = selectedSellCryptoAmount[0].buy_amount;
  }
  ngOnInit() {
    this.options.cardNumber = new FormControl('4242424242424242', [
      Validators.required
    ]);
    $('.toggle-deposits').click(function () {
      $('.table-main').toggleClass();
    });
    $('select').material_select();
    this.options.expiryMonth = new FormControl('03', [
      Validators.required
    ]);
    this.options.expiryYear = new FormControl('22', [
      Validators.required
    ]);
    this.options.cvc = new FormControl('123', [
      Validators.required
    ]);
    this.options.amount = new FormControl(50, [
      Validators.required
    ]);
    this.myform = new FormGroup({
      cardNumber: this.options.cardNumber,
      expiryMonth: this.options.expiryMonth,
      expiryYear: this.options.expiryYear,
      cvc: this.options.cvc,
      amount: this.options.amount
    });
    this.getTransactions();
  }
  getTransactions() {
    this.cwService.getTransactions().subscribe((res: any) => {
      if (res.status === 'success') {
        this.transactions = res.body.transactions;
        this.amountInWallet = res.body.amountInWallet;
        this.currencies = res.body.currencyLookup;
        this.fetchCryptoAmount();
      } else {
        return Materialize.toast(res.message, 3000);
      }
    });
  }

  withdrawAmountFN() {
    if (!this.withdrawAmount || this.withdrawAmount === 0 || this.withdrawAmount === '') {
      return Materialize.toast('Enter Amount.', 3000);
    }
    this.cwService.withdrawAmount(this.withdrawAmount).subscribe((res) => {
      if (res.status === 'success') {
        this.withdrawAmount = '';
        this.getTransactions();
      }
      return Materialize.toast(res.message, 3000);
    });
  }
  buyCrypto() {
    if (!this.cryptoType) {
      return Materialize.toast('Select Crypto Type.', 3000);
    }
    if (!this.buyAmount || this.buyAmount === 0 || this.buyAmount === '') {
      return Materialize.toast('Enter Buy Amount.', 3000);
    }
    this.cwService.buyCrypto(this.buyAmount, this.cryptoType).subscribe((res) => {
      if (res.status === 'success') {
        this.cryptoType = 'btc';
        this.buyAmount = '';
        this.getTransactions();
      }
      return Materialize.toast(res.message, 3000);
    });
  }
  sellCrypto() {
    if (!this.sellCryptoType) {
      return Materialize.toast('Select Crypto Type.', 3000);
    }
    if (!this.sellAmount || this.sellAmount === 0 || this.sellAmount === '') {
      return Materialize.toast('Enter Sell Amount.', 3000);
    }
    this.cwService.sellCrypto(this.sellAmount, this.sellCryptoType).subscribe((res) => {
      Materialize.toast(res.message, 3000);
    });
  }
  depositMoney() {
    this.payment.makePayment('stripe', this.myform.value, (status, response) => {
      this.cwService.depositAmount(response.id, this.myform.value.amount).subscribe((res) => {
        Materialize.toast(res.message, 3000);
      });
    });
  }
}
