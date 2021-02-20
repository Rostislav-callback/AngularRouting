import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  public validators = [Validators.required];

  public signupForm = new FormGroup({
    password: new FormGroup({
      password: new FormControl('', this.validators),
      repeatPassword: new FormControl('', this.validators),
    }, {
      validators: [this.equalValidator]
    })
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public signup(FormValue: any): void {
    this.router.navigate(['/home']);
    this.router.navigate(['/']);
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [password, repeatPassword] = Object.values(control.value);
    return password === repeatPassword ? null : {
      'Password' : 'Non working'
    }
  }
}
