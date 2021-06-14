import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { Observable, Subject } from "rxjs";

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
export class UserSettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('uploadPhoto', {static: false}) uploadPhoto: ElementRef;
  @ViewChild('passwordValue', {static: false}) passwordValue: ElementRef;
  @ViewChild('getNameBut', {static: false}) getNameBut: ElementRef;
  @ViewChild('getSurnameBut', {static: false}) getSurnameBut: ElementRef;
  @ViewChild('getBirthayBut', {static: false}) getBirthayBut: ElementRef;
  @ViewChild('getPasswordBut', {static: false}) getPasswordBut: ElementRef;
  @ViewChild('getPhoto', {static: false}) getPhoto: ElementRef;

  public userInfoForm: FormGroup;
  public getLname = JSON.parse(localStorage.getItem('lastname'));

  isShowButtons$: Observable<boolean>;
  isShowError$: Observable<boolean>;
  avatar$: Subject<string>;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private storageService: StorageService) {
    this.avatar$ = this.storageService.avatar$;
  }

  ngOnInit(): void {
    this.isShowButtons$ = this.userService.getInputState();
    this.isShowError$ = this.userService.getErrorState();

    this.initForm();
    this.loadDataFromStore();
  }

  ngAfterViewInit(): void {
    this.storageService.saveFinishedPhotoUrl(this.getPhoto.nativeElement);
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
    this.getNameBut.nativeElement.style.visibility = 'hidden';
  }

  cancelFirstNameButton() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldName = userObject.map(user => user.firstName);

    const firstNameObject: FirstName = { 
      "firstName":  oldName[0]
    };

    localStorage.setItem('firstname', JSON.stringify(oldName[0]));
    this.getNameBut.nativeElement.style.visibility = 'hidden';
    this.userService.firstName(firstNameObject);
    this.loadDataFromStore();
  }

  changeStateFname() {
    this.getNameBut.nativeElement.style.visibility = 'visible';
  }

  setLastName() {
    const lastNameObject: LastName = { 
      "surname":  this.userInfoForm.value.lastName
    };

    localStorage.setItem('lastname', JSON.stringify(this.userInfoForm.value.lastName));
    this.getSurnameBut.nativeElement.style.visibility = 'hidden';
    this.userService.lastName(lastNameObject);
  }

  cancelSurNameButton() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldSurName = userObject.map(user => user.surname);

    const lastNameObject: LastName = { 
      "surname":  oldSurName[0]
    };

    localStorage.setItem('lastname', JSON.stringify(oldSurName[0]));
    this.getSurnameBut.nativeElement.style.visibility = 'hidden';
    this.userService.lastName(lastNameObject);
    this.loadDataFromStore();
  }

  changeStateLastName() {
    this.getSurnameBut.nativeElement.style.visibility = 'visible';
  }

  setBirthday() {
    const birthdayObject: Birthday = { 
      "birthdayDate":  this.userInfoForm.value.changeBirth
    };

    localStorage.setItem('birthdaydate', JSON.stringify(this.userInfoForm.value.changeBirth));
    this.getBirthayBut.nativeElement.style.visibility = 'hidden';
    this.userService.birthday(birthdayObject);
  }

  cancelBirthdayButton() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const oldBirthdayName = userObject.map(user => user.birthdayDate);

    const birthdayObject: Birthday = { 
      "birthdayDate":  oldBirthdayName[0]
    };

    localStorage.setItem('birthdaydate', JSON.stringify(oldBirthdayName[0]));
    this.getBirthayBut.nativeElement.style.visibility = 'hidden';
    this.userService.birthday(birthdayObject);
    this.loadDataFromStore();
  }

  changeStateBirthday() {
    this.getBirthayBut.nativeElement.style.visibility = 'visible';
  }

  setChangePassword() {
    const changePasswordObject: ChangePassword = { 
      "password":  this.userInfoForm.value.confirmPassword
    };

    const password = JSON.parse(localStorage.getItem('Password'));

    if (password == this.userInfoForm.value.currentPassword) {
      this.userService.changePassword(changePasswordObject);
      localStorage.setItem('Password', JSON.stringify(this.userInfoForm.value.confirmPassword));
      this.getPasswordBut.nativeElement.style.visibility = 'hidden';
    }
  }

  cancelPasswordButton() {
    this.getPasswordBut.nativeElement.style.visibility = 'hidden';
    this.loadDataFromStore();
  }

  changeStatePassword() {
    this.getPasswordBut.nativeElement.style.visibility = 'visible';
  }

  setUserPhoto() {
    const userPhoto = this.uploadPhoto.nativeElement;
    const avatar = document.getElementById('photo');

    userPhoto.onchange = () => {
      const file = userPhoto.files[0];
      const reader = new FileReader();
      this.uploadPhoto.nativeElement.value = '';

      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onload = event => {
        localStorage.setItem('userphoto', JSON.stringify(event.target.result));

        if (avatar.hasAttribute('src')) {
          this.storageService.saveDemoPhotoUrlOnUploader(this.getPhoto.nativeElement);
        } 
      }
    }
  }

  editUserPhotoButton() {
    document.getElementById('file').click();
    this.userService.changeInputStateTrue();
  }

  cancelButtonUploader() {
    const userObject = JSON.parse(localStorage.getItem('Users'));
    const authedUser = JSON.parse(localStorage.getItem('Auth User'));

    userObject.map(user => {
      if (user.email.toLowerCase() === authedUser.toLowerCase()) {
        localStorage.setItem('userphoto', JSON.stringify(user.userphoto));

        this.userService.changeInputStateFalse();
        this.storageService.savePhotoUrlOnCencelButton(this.getPhoto.nativeElement);
      }
    });
  }

  saveButtonUploader()  {
    const getUrl = JSON.parse(localStorage.getItem('userphoto'));

    const changeFotoObject: UserPhoto = {
      "userphoto": getUrl
    };

    this.userService.changeFoto(changeFotoObject);
    this.storageService.savePhotoUrlOnSaveButton(this.getPhoto.nativeElement);
    this.avatar$.next(getUrl);
    this.userService.changeInputStateFalse();
  }

  get currentPassword() {
    return this.userInfoForm.get('currentPassword');
  }

  get confirmPassword() {
    return this.userInfoForm.get('confirmPassword');
  }

  changeState() {
    const pass = JSON.parse(localStorage.getItem('Password'));
    let userData = this.passwordValue.nativeElement.value;
    if (userData === "" || this.userInfoForm.untouched || userData === pass) {
      this.userService.changeErrorStateFalse();
    } else if (this.userInfoForm.touched || userData !== pass) {
      this.userService.changeErrorStateTrue();
    }
  }

  private changePasswordValidator(control: FormGroup): ValidationErrors | null {
    const pass = JSON.parse(localStorage.getItem('Password'));
    const [,,,currentPassword , newPassword, confirmPassword] = Object.values(control.value);

    return newPassword === confirmPassword && currentPassword === pass? null : {
      'Password' : 'Non working'
    }
  }

  private initForm() {
    this.userInfoForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      changeBirth: [''],
      currentPassword: ['', Validators.required],
      newPassword: [''],
      confirmPassword: ['']
    }, {
      validators: [this.changePasswordValidator]
    });
  }
}
