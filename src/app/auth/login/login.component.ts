import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Login } from "./../interfaces/login.interface";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public validators = [Validators.required];
  public loginError = 'User not found, please sign up';
  public passwordError = 'Invalid password';

  public isResponseError$: BehaviorSubject<boolean>;
  public isResponse$: BehaviorSubject<boolean>;

  
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {    
    this.isResponseError$ = this.authService.isResponseError$; 
    this.isResponse$ = this.authService.isResponse$;       
  }

  ngOnInit(): void {
    this.initLoginForm()
  }

  get emailLogin() {
    return this.loginForm.get('email');
  }

  public confirmLoginData() {
    const loginDataObject: Login = { 
      "email": this.loginForm.value.email, 
      "password": this.loginForm.value.password
    };

    this.authService.signin(loginDataObject);
  }


  public emailLoginValidator(control: FormGroup): ValidationErrors | null {
    const [email] = Object.values(control.value); 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)) ? null : {
      'Email' : 'Non working'
    }
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{1,9})+$'),
        Validators.required
      ])], 
        password: ['', ...this.validators],
    });
  }
}
