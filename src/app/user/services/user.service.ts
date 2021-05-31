import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";

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
  public isShowButtons$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isShowButtonsFirstName$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isShowButtonsSurName$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isShowButtonsBirthday$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  //метод загружает промежуточные данные на странице настроек
  demoPhotoDataBegin() {
    const photo = JSON.parse(localStorage.getItem('userphoto'));

    document.getElementById('photo').setAttribute('src', photo);
  }

  //метод загрузки старого фото и отмены промежуточного нового
  demoPhotoDataCencel() {
    const photo1 = JSON.parse(localStorage.getItem('userphoto1'));

    //фиксим багу подгрузки не того фото после перезагрузки страницы
    //путём переписывания данных в локал стораж для подгрузки в ngOnInit
    localStorage.setItem('userphoto', JSON.stringify(photo1));

    document.getElementById('photo').setAttribute('src', photo1);

    document.getElementById('photo1').setAttribute('src', photo1);
  }

  //метод загрузки нового фото для кнопки save
  demoPhotoDataSave() {
    const photo = JSON.parse(localStorage.getItem('userphoto'));

    document.getElementById('photo').setAttribute('src', photo);

    document.getElementById('photo1').setAttribute('src', photo);
  }

  //подгрузка фото в ngOnInit
  demoPhotoDataEnd() {
    const photo3 = JSON.parse(localStorage.getItem('userphoto3'));

    document.getElementById('photo').setAttribute('src', photo3);

    document.getElementById('photo1').setAttribute('src', photo3);
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

  getCurrentUser(): UserInfo {
    const users = JSON.parse(localStorage.getItem('User'));
    const authEmail = JSON.parse(localStorage.getItem('Auth User'));

    return users.find(user => user.email = authEmail);
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
