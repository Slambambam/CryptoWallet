import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/index';
import { Title } from '@angular/platform-browser';
import { ENV } from '../../core/env.config';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions = [];
  constructor(private tsService: TransactionService, private title: Title) {
    this.title.setTitle('Transactions');
  }

  ngOnInit() {
    this.getTransactions();
  }
  getTransactions() {
    this.tsService.getTransactions().subscribe((res) => {
      if (res.status === 'success') {
        this.transactions = res.body.transactions;
      }
      // Materialize.toast(res.message, 4000);
    });
  }
  openTransaction(type, tx) {
    let url = '';
    switch (type) {
      case 'btc':
        url = ENV.BTC_EXPLORER + tx;
        break;
      case 'bch':
        url = ENV.BCH_EXPLORER + tx;
        break;
      case 'ltc':
        url = ENV.LTC_EXPLORER + tx;
        break;
      case 'eth':
      case 'debc':
        url = ENV.ETH_EXPLORER + tx;
    }
    if (url !== '') {
      window.open(url, '_blank');
    }
  }
}
