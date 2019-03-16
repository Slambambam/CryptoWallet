import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../services';
import { Router, Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
// const Materialize = Materialize || {};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    this.user.email = new FormControl('james@bitexchange.systems', [
      Validators.required,
      Validators.email
    ]);
    this.user.password = new FormControl('pwd123456', [
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
      this.auth.login(this.myform.value).subscribe((res) => {
        if (res.status === 'success') {
          localStorage.setItem('access_token', res.body.access_token[0].token);
          localStorage.setItem('profile', JSON.stringify(res.body));
          // localStorage.setItem('access_token', JSON.stringify({ token: token, username: username }));
          this.router.navigate(['/dashboard']);
        }
        Materialize.toast(res.message, 4000);
      });
    } else {
      Materialize.toast('Invalid Form', 4000);
    }
  }

}
