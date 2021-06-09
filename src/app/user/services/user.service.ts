import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from "rxjs";

import { FirstName } from '../interfaces/username.interface';
import { LastName } from '../interfaces/lastname.interface';
import { ChangePassword } from '../interfaces/changepassword.interface';
import { Birthday } from '../interfaces/birthday.interface';
import { UserPhoto } from '../interfaces/userphoto.interface';
import { UserInfo } from '../../users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isShowButtons$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  getInputState(): Observable<boolean> {
    return this.isShowButtons$.asObservable()
  }

  //change
  isInputStateTrue() {
    this.isShowButtons$.next(true);
  }

  isInputStateFalse() {
    this.isShowButtons$.next(false);
  }

  firstName(firstNameObject: FirstName) {
    this.updateData(firstNameObject);
  }

  lastName(lastNameObject: LastName) {
    this.updateData(lastNameObject);
  }

  birthday(birthdayObject: Birthday) {
    this.updateData(birthdayObject);
  }
  
  changePassword(changePasswordObject: ChangePassword) {
    this.updateData(changePasswordObject);
  }

  changeFoto(changeFotoObject: UserPhoto) {
    this.updateData(changeFotoObject);
  }

  getCurrentUser(): UserInfo {
    const users = JSON.parse(localStorage.getItem('Users'));
    const authEmail = JSON.parse(localStorage.getItem('Auth User'));

    return users.find(user => user.email = authEmail);
  }

  private updateData(newData: FirstName | LastName | Birthday | ChangePassword | UserPhoto): void {
    const users = JSON.parse(localStorage.getItem('Users'));
    const authEmail = JSON.parse(localStorage.getItem('Auth User'));

    const newUsers = users.map(user => {
      if (user.email.toLowerCase() === authEmail.toLowerCase()) {
        const userKeys = Object.keys(user);
        const newDataKey = Object.keys(newData);
      
        const importantKey = userKeys.includes(newDataKey[0], 0);
        
        if (importantKey === true) {
          return {
            ...user, 
            ...newData
          }
        }
      } 

      return user;
    });
  
    localStorage.setItem('Users', JSON.stringify(newUsers));
  }
}
