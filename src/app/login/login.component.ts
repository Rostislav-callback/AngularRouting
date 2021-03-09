import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

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
      validators: [this.emailLoginValidator],
    }), 
    password: this.fb.group({
      password: ['', this.validators]
    })
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private userData: UserService) {            
  }

  ngOnInit(): void {
  }

  confirmLoginData() {
    const loginDataObject = { 
      "email": this.loginForm.value.email.email, 
      "password": this.loginForm.value.password.password
    }

    const loginData = [];                   

    if (localStorage.getItem('User') == null) {
      const loginError = 'User not found, please sign up'
      //console.log('User not found, please sign up')
      document.getElementById('logError').innerHTML = loginError;
    }

    if (localStorage.getItem('User') !== null) {
      let login = JSON.parse(localStorage.getItem('User'));

      loginData.push(loginDataObject)

      const findEmail = login.find(user => user.email === this.loginForm.value.email.email);
      const findPassword = login.find(user => user.password === this.loginForm.value.password.password);

      if (findEmail && findPassword) {
        console.log('Login!')
      } else {
        console.log('No!')
      }
    }
  }

  public login(FormValue: any): void {
    this.loginForm.valid ? this.router.navigate(['/home']): undefined;
  } 

  public emailLoginValidator(control: FormGroup): ValidationErrors | null {
    const [email] = Object.values(control.value); 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)) ? null : {
      'Email' : 'Non working'
    }
  }

}
