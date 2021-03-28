import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';
import { Router } from "@angular/router";

import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Signup } from '../interfaces/signup.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  public validators = [Validators.required];
  public isResponseError$: BehaviorSubject<boolean>;
  public isResponse$: BehaviorSubject<boolean>;
  private subscription: Subscription;

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.isResponseError$ = this.authService.isResponseError$;

    this.subscription = this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationStart') {
        this.isResponseError$.next(false);
      } 
    });
  }

  ngOnInit() {
    this.initForm();
  }

  get email() {
    return this.signupForm.get('email');
  }

  get repeatPassword() {
    return this.signupForm.get('repeatPassword');
  }

  setUserData() {
    const usersDataObject: Signup = { 
      "email":  this.signupForm.value.email,
      "password":  this.signupForm.value.password
    };

    this.authService.signup(usersDataObject);
  }

  changeState(data) {
    let userData = data;
    if (userData === "" && this.signupForm.untouched) {
      this.isResponseError$.next(false);
    }
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [, password, repeatPassword] = Object.values(control.value);

    return password === repeatPassword ? null : {
      'Password' : 'Non working'
    }
  }

  private initForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{1,9})+$'),
        Validators.required
    ])],
      password: ['', ...this.validators],
      repeatPassword: ['', ...this.validators]
    }, {
      validators: [this.equalValidator]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
