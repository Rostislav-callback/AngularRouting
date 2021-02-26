import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public validators = [Validators.required];

  public loginForm = this.fb.group({
    email: this.fb.group({
      email: ['', this.validators]
    }, {
      validators: [this.emailValidator]
    }), 
    password: this.fb.group({
      password: ['', this.validators]
    })
  });

  constructor(private router: Router,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  public login(FormValue: any): void {
    this.router.navigate(['/home']);
  } 

  public emailValidator(control: FormGroup): ValidationErrors | null {
    const [email] = Object.values(control.value); 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)) ? null : {
      'Email' : 'Non working'
    }
  }
}
