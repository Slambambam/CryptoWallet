import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ENV } from '../core/env.config';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  registerUser(user: object): Observable<any> {
    // return this.http.post(ENV.SEND_MONEY_URI, user);
    return this.http.post(ENV.REGISTER_URI, user);
  }
  getUsers(): Observable<any> {
    // return this.http.post(ENV.SEND_MONEY_URI, user);
    return this.http.get(ENV.ADMIN_USERS);
  }
}
