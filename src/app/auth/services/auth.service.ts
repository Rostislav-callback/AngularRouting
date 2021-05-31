import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { ToastrService } from 'ngx-toastr';

import { UserInfo } from '../../users.interface'


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public isResponseError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isResponse$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());

    constructor(private router: Router,
                private toastr: ToastrService) {

    }

    signup(usersDataObject: UserInfo): void {
        const userData = [];

        if (localStorage.getItem('Users') == null) {
            usersDataObject.isAuth = true;
            userData.push(usersDataObject);

            localStorage.setItem('Users', JSON.stringify(userData));
            localStorage.setItem('Auth User', JSON.stringify(usersDataObject.email));
            localStorage.setItem('Password', JSON.stringify(usersDataObject.password));
            localStorage.setItem('isAuth', 'true');

            this.isResponse$.next(true);
            this.router.navigate(['/home']);
            this.toastr.success('You are added!', 'Sign Up');
        } else {
            let data = JSON.parse(localStorage.getItem('Users'));

            const findUser = data.find(user => user.email === usersDataObject.email);

            if (findUser) {
                this.isResponseError$.next(true);
                this.toastr.error('Error!', 'Sign Up');
                 
            } else {
                usersDataObject.isAuth = true;
                data.push(usersDataObject);
            
                localStorage.setItem('Users', JSON.stringify(data));
                localStorage.setItem('Auth User', JSON.stringify(usersDataObject.email));
                localStorage.setItem('Password', JSON.stringify(usersDataObject.password));
                localStorage.setItem('isAuth', 'true');

                this.toastr.success('Compleate!', 'Sign Up');

                this.isResponse$.next(true);

                this.router.navigate(['/home']);
            }
        }
    }

    signin(loginDataObject: UserInfo) {
        const loginData = [];                   

        if (localStorage.getItem('Users') == null) {
            this.isResponseError$.next(true);
            this.toastr.error('User not found!', 'Sign Up');
            
        } else {
            let login = JSON.parse(localStorage.getItem('Users'));

            loginData.push(loginDataObject);

            const findEmail = login.find(user => user.email === loginDataObject.email);
            const findPassword = login.find(user => user.password === loginDataObject.password);

            if (findEmail && findPassword) {
                const userStatus = login.map(user => {
                    user.isAuth = true;
              
                    return user;
                });
        
                localStorage.setItem('Users', JSON.stringify(userStatus));

                this.router.navigate(['/home']);

                this.isResponse$.next(true);

                this.toastr.success('Compleate!', 'Log In');

                localStorage.setItem('Auth User', JSON.stringify(loginDataObject.email));
                localStorage.setItem('Password', JSON.stringify(loginDataObject.password));

                localStorage.setItem('isAuth', 'true');

            } else {
                this.isResponseError$.next(true);
                
                this.isResponse$.next(false);

                this.toastr.error('Required user!', 'Sign Up');
            }
        }
    }

    logout() {
        const users = JSON.parse(localStorage.getItem('Users'));
        const authedUser = JSON.parse(localStorage.getItem('Auth User'));

        const logoutUserStatus = users.map(user => {
            if (user.email.toLowerCase() === authedUser.toLowerCase()) {
                user.isAuth = false;
            } 
      
            return user;
        });

        localStorage.setItem('Users', JSON.stringify(logoutUserStatus));
    

        this.isResponse$.next(false);

        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('Auth User');
        localStorage.removeItem('Password');
    }

    isAuth(): boolean {
        return !!localStorage.getItem('isAuth');
    }
}