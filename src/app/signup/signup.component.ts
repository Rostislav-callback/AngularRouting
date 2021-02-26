import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  public validators = [Validators.required];

  public signupForm = this.fb.group({
    email: this.fb.group({
      email: ['', this.validators]
    }, {
      validators: [this.emailValidator]
    }), 
    password: this.fb.group({
      password: ['', this.validators],
      repeatPassword: ['', this.validators]
    }, {
      validators: [this.equalValidator]
    })
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  postEmailData() {
    return this.http.get('signupForm.value.json'); 
  }

  public signup(FormValue: any): void {
    this.signupForm.valid ? this.router.navigate(['/home']) : undefined;
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [password, repeatPassword] = Object.values(control.value);
    return password === repeatPassword ? null : {
      'Password' : 'Non working'
    }
  }

  public emailValidator(control: FormGroup): ValidationErrors | null {
    const [email] = Object.values(control.value); 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)) ? null : {
      'Email' : 'Non working'
    }
  }
}
