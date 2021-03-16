import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";

import { Signup } from "./../interfaces/signup.interface";
import { Login } from "./../interfaces/login.interface";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public isResponseError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isResponse$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());

    constructor(private router: Router) {

    }

    signup(usersDataObject: Signup): void {
        const userData = [];

        if (localStorage.getItem('User') == null) {
            localStorage.setItem('User', JSON.stringify(userData));
        } else {
            let data = JSON.parse(localStorage.getItem('User'));

            const findUser = data.find(user => user.email === usersDataObject.email);

            if (findUser) {
                this.isResponseError$.next(true);
                 
            } else {
                data.push(usersDataObject);
            
                localStorage.setItem('User', JSON.stringify(data));

                localStorage.setItem('isAuth', 'true');

                this.isResponse$.next(true);

                this.router.navigate(['/home']);
          
            }
        }
    }

    signin(loginDataObject: Login) {
        const loginData = [];                   

        if (localStorage.getItem('User') == null) {
            console.log('User not found, please sign up')
            this.isResponseError$.next(true);
            
        } else {
            let login = JSON.parse(localStorage.getItem('User'));

            loginData.push(loginDataObject);

            const findEmail = login.find(user => user.email === loginDataObject.email);
            const findPassword = login.find(user => user.password === loginDataObject.password);

            if (findEmail && findPassword) {
                this.router.navigate(['/home']);

                this.isResponse$.next(true);

                localStorage.setItem('isAuth', 'true');

            } else {
                this.isResponseError$.next(true);
                this.isResponse$.next(false);
            }
        }
    }

    logout() {
        console.log('exit');
        this.isResponse$.next(false);
        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('isAuth');
    }

    isAuth(): boolean {
        return !!localStorage.getItem('isAuth');
    }
}