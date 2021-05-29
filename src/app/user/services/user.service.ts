import { Injectable } from '@angular/core';

import { FirstName } from '../interfaces/username.interface';
import { LastName } from '../interfaces/lastname.interface';
import { ChangePassword } from '../interfaces/changepassword.interface';
import { Birthday } from '../interfaces/birthday.interface';
import { UserPhoto } from '../interfaces/userphoto.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  demoFirstNameData() {
    let fname = document.getElementById('fname');
    const getFname = JSON.parse(localStorage.getItem('firstname'));

    return getFname
    //fname.setAttribute('value', getFname);
  }

  demoLastNameData() {
    let lname = document.getElementById('lname');
    const getLname = JSON.parse(localStorage.getItem('lastname'));

    lname.setAttribute('value', getLname);
  }

  demoBirthdayData() {
    let birth = document.getElementById('birth');
    const getBirth = JSON.parse(localStorage.getItem('birthdaydate'));

    birth.setAttribute('value', getBirth);
  }

  demoPhotoData() {
    const photo = JSON.parse(localStorage.getItem('userphoto'));

    document.getElementById('photo').setAttribute('src', photo);

    document.getElementById('photo1').setAttribute('src', photo);
  }

  headerPhoto() {
    const photo = JSON.parse(localStorage.getItem('userphoto'));

    document.getElementById('photo1').setAttribute('src', photo);
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

  private updateData(newData: FirstName | LastName | Birthday | ChangePassword | UserPhoto): void {
    const users = JSON.parse(localStorage.getItem('User'));
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
  
    localStorage.setItem('User', JSON.stringify(newUsers));
  }
}
