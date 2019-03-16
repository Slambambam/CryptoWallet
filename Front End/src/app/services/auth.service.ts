import { Injectable } from '@angular/core';
import { ENV } from '../core/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: any;
  constructor(private http: HttpClient) {
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isLoggedIn() {
    // console.log("ACCESS TOKEN ", localStorage.getItem('access_token'));
    return localStorage.getItem('access_token') !== null;
  }
  updateLocalUser(user) {
    let userObj = this.getUser();
    userObj = Object.assign({}, userObj, user);
    localStorage.setItem('profile', JSON.stringify(userObj));
  }
  getUser() {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('profile'));
    }
    return null;
  }
  isUser() {
    if (this.isLoggedIn()) {
      this.user = JSON.parse(localStorage.getItem('profile'));
      return this.user.roles.indexOf('user') !== -1;
    }
    return false;
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      this.user = JSON.parse(localStorage.getItem('profile'));
      return this.user.roles.indexOf('admin') !== -1;
    }
    return false;
  }
  login(user: object): Observable<any> {
    return this.http.post(ENV.LOGIN_URI, user);
  }
  forgotPassword(user) {
    return this.http.post(ENV.FORGOT_PASSWORD_URI, user);
  }
  loginAsAdmin(user: object): Observable<any> {
    return this.http.post(ENV.ADMIN_LOGIN_URI, user);
  }
  updateAdminProfile(user: object): Observable<any> {
    return this.http.put(ENV.ADMIN_PROFILE, user);
  }
  updateProfile(user: object): Observable<any> {
    return this.http.put(ENV.PROFILE, user);
  }
}
