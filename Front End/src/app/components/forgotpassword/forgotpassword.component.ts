import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  user: any = {
    email: FormControl,
    password: FormControl
  };
  myform: FormGroup;
  constructor(private auth: AuthService, private router: Router, private title: Title) {
    this.title.setTitle('Forgot Password');
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
  }
  createForm() {
    this.myform = new FormGroup({
      email: this.user.email
    });
  }
  doLogin() {
    if (this.myform.valid) {
      this.auth.forgotPassword(this.myform.value).subscribe((res: any) => {
        Materialize.toast(res.message, 4000);
      });
    } else {
      Materialize.toast('Invalid Form', 4000);
    }
  }

}
