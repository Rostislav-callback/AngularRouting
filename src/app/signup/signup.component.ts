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
    username: new FormControl ('', this.validators),
    password: new FormControl({
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
    this.router.navigate(['/login']);
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [password, repeatPassword] = Object.values(control.value);
    return password
  }
}
