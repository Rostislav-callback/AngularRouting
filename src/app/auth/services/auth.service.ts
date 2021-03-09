import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";

import { Signup } from "./../interfaces/signup.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public isResponseError$: Subject<boolean> = new Subject();

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

                this.router.navigate(['/home']);
          
            }
        }
    }

    signin() {
    }
}