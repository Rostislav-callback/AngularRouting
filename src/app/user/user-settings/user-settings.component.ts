import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { Observable } from "rxjs";

import { FirstName } from '../interfaces/username.interface';
import { LastName } from '../interfaces/lastname.interface';
import { ChangePassword } from '../interfaces/changepassword.interface';
import { Birthday } from '../interfaces/birthday.interface';
import { UserPhoto } from '../interfaces/userphoto.interface';
import { UserService } from '../services/user.service';
import { UserInfo } from '../../users.interface';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('uploadPhoto', {static: false}) uploadPhoto: ElementRef;

  public userInfoForm: FormGroup;
  public getLname = JSON.parse(localStorage.getItem('lastname'));

  isShowButtons$: Observable<boolean>;
  
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.storageService.saveFinishedPhotoUrl();
    this.isShowButtons$ = this.userService.getInputState();

    this.initForm();
    this.loadDataFromStore();
  }

  loadDataFromStore() {
    const currentUser: UserInfo = this.userService.getCurrentUser();

    this.userInfoForm.patchValue({
      firstName: currentUser.firstName,
      lastName: currentUser.surname,
      changeBirth: currentUser.birthdayDate
    });
  }

  setFirstName() {
    const firstNameObject: FirstName = { 
      "firstName":  this.userInfoForm.value.firstName
    };

    localStorage.setItem('firstname', JSON.stringify(this.userInfoForm.value.firstName));

    this.userService.firstName(firstNameObject);
    document.getElementById('first').style.visibility = 'hidden';
  }

  cancelFirstNameButton() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldName = userObject.map(user => user.firstName);

    const firstNameObject: FirstName = { 
      "firstName":  oldName[0]
    };

    localStorage.setItem('firstname', JSON.stringify(oldName[0]));

    this.userService.firstName(firstNameObject);
    document.getElementById('first').style.visibility = 'hidden';
    this.loadDataFromStore();
  }

  changeStateFname() {
    document.getElementById('first').style.visibility = 'visible';
  }

  setLastName() {
    const lastNameObject: LastName = { 
      "surname":  this.userInfoForm.value.lastName
    };

    localStorage.setItem('lastname', JSON.stringify(this.userInfoForm.value.lastName));
    this.userService.lastName(lastNameObject);
    document.getElementById('second').style.visibility = 'hidden';
  }

  cancelSurNameButton() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldSurName = userObject.map(user => user.surname);

    const lastNameObject: LastName = { 
      "surname":  oldSurName[0]
    };

    localStorage.setItem('lastname', JSON.stringify(oldSurName[0]));
    this.userService.lastName(lastNameObject);
    this.loadDataFromStore();
    document.getElementById('second').style.visibility = 'hidden';
  }

  changeStateLastName() {
    document.getElementById('second').style.visibility = 'visible';
  }

  setBirthday() {
    const birthdayObject: Birthday = { 
      "birthdayDate":  this.userInfoForm.value.changeBirth
    };

    localStorage.setItem('birthdaydate', JSON.stringify(this.userInfoForm.value.changeBirth));
    this.userService.birthday(birthdayObject);
    document.getElementById('birth').style.visibility = 'hidden';
  }

  cancelBirthdayButton() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldBirthdayName = userObject.map(user => user.birthdayDate);

    const birthdayObject: Birthday = { 
      "birthdayDate":  oldBirthdayName[0]
    };

    localStorage.setItem('birthdaydate', JSON.stringify(oldBirthdayName[0]));
    document.getElementById('birth').style.visibility = 'hidden';
    this.userService.birthday(birthdayObject);
    this.loadDataFromStore();
  }

  changeStateBirthday() {
    document.getElementById('birth').style.visibility = 'visible';
  }

  setChangePassword() {
    const changePasswordObject: ChangePassword = { 
      "password":  this.userInfoForm.value.confirmPassword
    };

    const password = JSON.parse(localStorage.getItem('Password'));

    if (password == this.userInfoForm.value.currentPassword) {
      this.userService.changePassword(changePasswordObject);
      localStorage.setItem('Password', JSON.stringify(this.userInfoForm.value.confirmPassword));
    }
  }

  setUserPhoto() {
    const userPhoto = this.uploadPhoto.nativeElement;
    const avatar = document.getElementById('photo');

    userPhoto.onchange = () => {
      const file = userPhoto.files[0];
      this.uploadPhoto.nativeElement.value = '';
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onload = event => {
        localStorage.setItem('userphoto', JSON.stringify(event.target.result));

        if (avatar.hasAttribute('src')) {
          this.storageService.saveDemoPhotoUrlOnUploader();
        } 
      }
    }
  }

  editUserPhotoButton() {
    document.getElementById('file').click();
    this.userService.isInputStateTrue()
  }

  cancelButtonUploader() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldPhotoUrl = userObject.map(user => user.userphoto);

    localStorage.setItem('userphoto1', JSON.stringify(oldPhotoUrl[0]));
    localStorage.setItem('userphoto2', JSON.stringify(oldPhotoUrl[0]));
    this.storageService.savePhotoUrlOnCencelButton();
  }

  saveButtonUploader()  {
    const getUrl = JSON.parse(localStorage.getItem('userphoto'));

    localStorage.setItem('userphoto2', JSON.stringify(getUrl));

    const changeFotoObject: UserPhoto = {
      "userphoto": getUrl
    };

    this.userService.changeFoto(changeFotoObject);
    this.storageService.savePhotoUrlOnSaveButton();
    this.userService.isInputStateFalse();
  }

  private changePasswordValidator(control: FormGroup): ValidationErrors | null {
    const [,,,, newPassword, confirmPassword] = Object.values(control.value);

    return newPassword === confirmPassword ? null : {
      'Password' : 'Non working'
    }
  }

  private initForm() {
    this.userInfoForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      changeBirth: [''],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    }, {
      validators: [this.changePasswordValidator]
    });
  }
}
