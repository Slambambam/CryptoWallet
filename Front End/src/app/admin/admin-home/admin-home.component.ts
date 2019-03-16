import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
declare var $: any;
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  users: any;
  constructor(private userService: UserService, private title: Title) {
    this.title.setTitle('Home');
  }

  ngOnInit() {
  }

}
