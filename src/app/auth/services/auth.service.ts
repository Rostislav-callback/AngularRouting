import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";

import { Signup } from "./../interfaces/signup.interface";
import { Login } from "./../interfaces/login.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public isResponseError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isResponse$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private router: Router) {

    }

    signup(usersDataObject: Signup): void {
        const userData = []

        if (localStorage.getItem('User') == null){
            localStorage.setItem('User', JSON.stringify(userData));
        } 
    
        if (localStorage.getItem('User') !== null) {
            console.log('store')

            let data = JSON.parse(localStorage.getItem('User'));

            const findUser = data.find(user => user.email === usersDataObject.email);

            if (findUser) {
                console.log('This email is exist!');
                this.isResponseError$.next(true);
                 
            } else {
                data.push(usersDataObject);
            
                localStorage.setItem('User', JSON.stringify(data));

                this.isResponse$.next(true);
                this.router.navigate(['/home']);
          
            }
        }
    }

    signin(loginDataObject: Login): void {
        const loginData = [];                   

        if (localStorage.getItem('User') == null) {
            console.log('User not found, please sign up')
        }

        if (localStorage.getItem('User') !== null) {
            let login = JSON.parse(localStorage.getItem('User'));

            loginData.push(loginDataObject);
            console.log('push')

            const findEmail = login.find(user => user.email === loginDataObject.email);
            const findPassword = login.find(user => user.password === loginDataObject.password);

            if (findEmail && findPassword) {
                console.log('Login!')
                this.router.navigate(['/home']);
                this.isResponse$.next(true);
            } else {
                console.log('No!')
                this.isResponseError$.next(true);
            }
        }
    }

    logout() {
        this.isResponse$.next(false);
    }
}