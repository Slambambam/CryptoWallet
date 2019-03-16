import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions = [];
  constructor(private title: Title, private tsService: TransactionService) {
    this.title.setTitle('Fiat Transactions');
  }

  ngOnInit() {
    this.tsService.getAdminFiatTransactions().subscribe((res: any) => {
      this.transactions = res.body.transactions;
      Materialize.toast(res.message, 3000);
    });
  }

}
