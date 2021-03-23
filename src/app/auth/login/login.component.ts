import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from "@angular/router";

import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';

import { Login } from "./../interfaces/login.interface";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public validators = [Validators.required];

  public isResponseError$: BehaviorSubject<boolean>;
  public isResponse$: BehaviorSubject<boolean>;
  private subscription: Subscription;
  
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {    
    this.isResponseError$ = this.authService.isResponseError$; 
    this.isResponse$ = this.authService.isResponse$;   
    
    this.subscription = router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationStart') {
        this.isResponseError$.next(false);
      }
    });
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get emailLogin() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  confirmLoginData() {
    const loginDataObject: Login = { 
      "email": this.loginForm.value.email, 
      "password": this.loginForm.value.password
    };
      
    this.authService.signin(loginDataObject);
  }

  changeState(data) {
    let userData = data;
    if (userData === "") {
      this.isResponseError$.next(false);
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
