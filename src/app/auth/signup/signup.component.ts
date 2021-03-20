import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

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

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.isResponseError$ = this.authService.isResponseError$;
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

  public setUserData() {
    const usersDataObject: Signup = { 
      "email":  this.signupForm.value.email,
      "password":  this.signupForm.value.password
    };

    this.authService.signup(usersDataObject);
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
}
