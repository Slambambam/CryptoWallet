import { Injectable } from '@angular/core';
import { ENV } from '../core/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  getTransactions(): Observable<any> {
    return this.http.get(ENV.TRANSACTION_URI, {});
  }
  getAdminFiatTransactions(): Observable<any> {
    return this.http.get(ENV.CW_GET_ADMIN_TRANSACTIONS, {});
  }
  sendMoney(cryptoObj): Observable<any> {
    return this.http.post(ENV.SEND_MONEY_URI, cryptoObj);
  }
}
