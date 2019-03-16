import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Title } from '@angular/platform-browser';
declare var Materialize: any;
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {
    email: FormControl,
    first_name: FormControl,
    last_name: FormControl,
    password: FormControl,
    country_code: FormControl,
    phone: FormControl
  };
  myform: FormGroup;
  constructor(private uService: UserService, private router: Router, private title: Title) {
    this.title.setTitle('Register');
  }

  ngOnInit() {
    this.createForm();
    // $('select').material_select();
  }
  get first_name() { return this.myform.get('first_name'); }
  get last_name() { return this.myform.get('last_name'); }
  get email() { return this.myform.get('email'); }
  get password() { return this.myform.get('password'); }
  get phone() { return this.myform.get('phone'); }
  get country_code() { return this.myform.get('country_code'); }
  createForm() {
    this.myform = new FormGroup({
      'first_name': new FormControl('', [
        Validators.required
      ]),
      'last_name': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      'phone': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      'country_code': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }
  registerUser() {
    // this.myform.last_name.markAsDirty();
    if (!this.myform.valid) {
      return Materialize.toast('Invalid Form.');
    }
    this.uService.registerUser(this.myform.value).subscribe((res) => {
      if (res.status === 'success') {
        this.myform.reset();
        // Materialize.toast('User registered successfully');
        this.router.navigate(['/login']);
      }
      Materialize.toast(res.message, 4000);
    });
  }

}
