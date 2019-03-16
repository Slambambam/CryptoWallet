import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router, Params, NavigationEnd } from '@angular/router';
// import { URLSearchParams } from '@angular/http';
declare var $: any;
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService, private router: Router, private title: Title) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.title.setTitle(event.url.replace('/', ''));
    //   }
    // });
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown({});
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/admin/login']);
  }
}
