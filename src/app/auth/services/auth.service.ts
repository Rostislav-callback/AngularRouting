import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { ToastrService } from 'ngx-toastr';

import { Signup } from "./../interfaces/signup.interface";
import { Login } from "./../interfaces/login.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public isResponseError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isResponse$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());

    constructor(private router: Router,
                private toastr: ToastrService) {

    }

    signup(usersDataObject: Signup): void {
        const userData = [];

        if (localStorage.getItem('User') == null) {
            localStorage.setItem('User', JSON.stringify(userData));

            this.toastr.success('You are added!', 'Sign Up');
        } else {
            let data = JSON.parse(localStorage.getItem('User'));

            const findUser = data.find(user => user.email === usersDataObject.email);

            if (findUser) {
                this.isResponseError$.next(true);
                this.toastr.error('Error!', 'Sign Up');
                 
            } else {
                data.push(usersDataObject);
            
                localStorage.setItem('User', JSON.stringify(data));
                localStorage.setItem('isAuth', 'true');

                this.toastr.success('Compleate!', 'Sign Up');

                this.isResponse$.next(true);

                this.router.navigate(['/home']);
            }
        }
    }

    signin(loginDataObject: Login) {
        const loginData = [];                   

        if (localStorage.getItem('User') == null) {
            this.isResponseError$.next(true);
            this.toastr.error('User not found!', 'Sign Up');
            
        } else {
            let login = JSON.parse(localStorage.getItem('User'));

            loginData.push(loginDataObject);

            const findEmail = login.find(user => user.email === loginDataObject.email);
            const findPassword = login.find(user => user.password === loginDataObject.password);

            if (findEmail && findPassword) {
                this.router.navigate(['/home']);

                this.isResponse$.next(true);

                this.toastr.success('Compleate!', 'Log In');

                localStorage.setItem('isAuth', 'true');

            } else {
                this.isResponseError$.next(true);
                
                this.isResponse$.next(false);

                this.toastr.error('Required user!', 'Sign Up');
            }
        }
    }

    logout() {
        this.isResponse$.next(false);

        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('isAuth');
    }

    isAuth(): boolean {
        return !!localStorage.getItem('isAuth');
    }
}