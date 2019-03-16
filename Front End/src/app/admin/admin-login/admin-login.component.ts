import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../services';
import { Router, Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
// const Materialize = Materialize || {};
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  user: any = {
    email: FormControl,
    password: FormControl
  };
  myform: FormGroup;
  constructor(private auth: AuthService, private router: Router, private title: Title) {
    this.title.setTitle('Login');
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  createFormControls() {
    this.user.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.user.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }
  createForm() {
    this.myform = new FormGroup({
      email: this.user.email,
      password: this.user.password
    });
  }
  doLogin() {
    if (this.myform.valid) {
      this.auth.loginAsAdmin(this.myform.value).subscribe((res) => {
        console.log(res)
        if (res.status === 'success') {
          localStorage.setItem('access_token', res.body.access_token[0].token);
          localStorage.setItem('profile', JSON.stringify(res.body));
          this.router.navigate(['/admin/dashboard']);
        }
        Materialize.toast(res.message, 4000);
      });
    } else {
      Materialize.toast('Invalid Form', 4000);
    }
  }

}
