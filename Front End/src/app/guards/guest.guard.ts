import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isLoggedIn() && !this.auth.isUser() && !this.auth.isAdmin()) {
      console.log('AUTH GUARD LET GO');
      return true;
    } else if (this.auth.isLoggedIn() && this.auth.isUser()) {
      this.router.navigate(['/dashboard']);
    } else if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
