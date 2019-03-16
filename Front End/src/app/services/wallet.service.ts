import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from '../core/env.config';

@Injectable()
export class WalletService {

  constructor(private http: HttpClient) { }
  getWallet(): Observable<any> {
    return this.http.get(ENV.WALLET_URI);
  }
  refresWallet(): Observable<any> {
    return this.http.get(ENV.REFRESH_WALLET_URI);
  }
  getCurrencyLookup(): Observable<any> {
    return this.http.get(ENV.CW_GET_ADMIN_COIN_LOOKUP);
  }
  updateCurrencyLookup(coinObj: any): Observable<any> {
    return this.http.put(ENV.CW_GET_ADMIN_UPDATE_COIN_LOOKUP, coinObj);
  }

}
