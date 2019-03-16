import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any;
  constructor(private userService: UserService, private title: Title) {
    this.title.setTitle('Users');
  }

  ngOnInit() {
    this.getUsers();
  }
  getAmount(coin: String, array: Array<any>) {
    array = array.filter((item) => {
      return item.coin_type === coin;
    });
    return array.length && array[0].confirmed_amount ? array[0].confirmed_amount : 0;
  }
  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      if (res.status === 'success') {
        this.users = res.body.users;
      }
      Materialize.toast(res.message, 4000);
    });
  }

}
