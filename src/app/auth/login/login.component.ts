import { Component, OnInit, EventEmitter } from '@angular/core';
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

  public isResponseError$: BehaviorSubject<boolean>;
  public isResponse$: BehaviorSubject<boolean>;

  
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {    
    this.isResponseError$ = this.authService.isResponseError$; 
    this.isResponse$ = this.authService.isResponse$;       
  }

  ngOnInit(): void {
    this.initLoginForm();
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
