import { Injectable } from '@angular/core';
import { ENV } from '../core/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CwService {

  constructor(private http: HttpClient) { }
  buyCrypto(amount, coin): Observable<any> {
    return this.http.post(ENV.CW_BUY_CRYPTO, { amount, coin });
  }
  sellCrypto(amount, coin): Observable<any> {
    return this.http.post(ENV.CW_SELL_CRYPTO, { amount, coin });
  }
  withdrawAmount(amount): Observable<any> {
    return this.http.post(ENV.CW_WITHDRAW_AMOUNT, { amount });
  }
  depositAmount(token, amount): Observable<any> {
    return this.http.post(ENV.CW_DEPOSIT_AMOUNT, { token, amount });
  }
  getTransactions(): Observable<any> {
    return this.http.get(ENV.CW_GET_TRANSACTIONS);
  }

}
