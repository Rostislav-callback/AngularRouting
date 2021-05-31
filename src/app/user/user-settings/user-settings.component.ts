import { Component, ElementRef, OnInit, ViewChild, HostListener} from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { BehaviorSubject } from "rxjs";

import { FirstName } from '../interfaces/username.interface';
import { LastName } from '../interfaces/lastname.interface';
import { ChangePassword } from '../interfaces/changepassword.interface';
import { Birthday } from '../interfaces/birthday.interface';
import { UserPhoto } from '../interfaces/userphoto.interface';
import { UserService } from '../services/user.service';
import { UserInfo } from '../../users.interface';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('uploadPhoto', {static: false}) uploadPhoto: ElementRef;

  @HostListener('document:click', ['$event'])
	onClick(event: Event) {
		if (!this.el.nativeElement.contains(event.target)) {
			this.isShowButtonsFirstName$.next(false);
      this.isShowButtonsSurName$.next(false);
      this.isShowButtonsSurName$.next(false);
      this.isShowButtons$.next(false);
      this.loadDataFromStore();
		}
	}

  public userInfoForm: FormGroup;
  public getLname = JSON.parse(localStorage.getItem('lastname'));
  //сохраняем состояние показа на странице 
  //всплывающих кнопок подтверждения изменений
  public isShowButtons$: BehaviorSubject<boolean>;
  public isShowButtonsFirstName$: BehaviorSubject<boolean>;
  public isShowButtonsSurName$: BehaviorSubject<boolean>;
  public isShowButtonsBirthday$: BehaviorSubject<boolean>;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private el: ElementRef) {
    this.isShowButtons$ = this.userService.isShowButtons$;
    this.isShowButtonsFirstName$ = this.userService.isShowButtonsFirstName$;
    this.isShowButtonsSurName$ = this.userService.isShowButtonsSurName$;
    this.isShowButtonsBirthday$ = this.userService.isShowButtonsBirthday$;
  }

  ngOnInit(): void {
    this.userService.demoPhotoDataSave();

    this.initForm();
    this.loadDataFromStore();
  }

  loadDataFromStore() {
    const currentUser: UserInfo = this.userService.getCurrentUser();

    this.userInfoForm.patchValue({
      firstName: currentUser.firstName,
      lastName: currentUser.surname,
      changeBirth: currentUser.birthdayDate
    })
  }

  setFirstName() {
    const firstNameObject: FirstName = { 
      "firstName":  this.userInfoForm.value.firstName
    };

    localStorage.setItem('firstname', JSON.stringify(this.userInfoForm.value.firstName));
    this.userService.firstName(firstNameObject);
    this.isShowButtonsFirstName$.next(false);
  }

  cencelFirstNameButton() {
    const userObject = JSON.parse(localStorage.getItem('User'));

    //получаем сохранённое ранее фото из объекта юзера
    const oldName = userObject.map(user => user.firstName);

    const firstNameObject: FirstName = { 
      "firstName":  oldName[0]
    };

    localStorage.setItem('firstname', JSON.stringify(oldName[0]));
    this.userService.firstName(firstNameObject);
    this.isShowButtonsFirstName$.next(false);
    this.loadDataFromStore();
  }

  changeStateFname() {
    this.isShowButtonsFirstName$.next(true);
  }

  setLastName() {
    const lastNameObject: LastName = { 
      "surname":  this.userInfoForm.value.lastName
    };

    this.userService.lastName(lastNameObject);

    localStorage.setItem('lastname', JSON.stringify(this.userInfoForm.value.lastName));
    this.isShowButtonsSurName$.next(false);
  }

  cencelSurNameButton() {
    const userObject = JSON.parse(localStorage.getItem('User'));

    //получаем сохранённое ранее фото из объекта юзера
    const oldSurName = userObject.map(user => user.surname);

    const lastNameObject: LastName = { 
      "surname":  oldSurName[0]
    };

    localStorage.setItem('lastname', JSON.stringify(oldSurName[0]));
    this.userService.lastName(lastNameObject);
    this.isShowButtonsSurName$.next(false);
    this.loadDataFromStore();
  }

  changeStateLastName() {
    this.isShowButtonsSurName$.next(true);
  }

  setBirthday() {
    const birthdayObject: Birthday = { 
      "birthdayDate":  this.userInfoForm.value.changeBirth
    };

    this.userService.birthday(birthdayObject);

    localStorage.setItem('birthdaydate', JSON.stringify(this.userInfoForm.value.changeBirth));

    this.isShowButtonsBirthday$.next(false);
  }

  cencelBirthdayButton() {
    const userObject = JSON.parse(localStorage.getItem('User'));

    const oldBirthdayName = userObject.map(user => user.birthdayDate);

    const birthdayObject: Birthday = { 
      "birthdayDate":  oldBirthdayName[0]
    };

    this.userService.birthday(birthdayObject);

    localStorage.setItem('birthdaydate', JSON.stringify(oldBirthdayName[0]));
    this.isShowButtonsBirthday$.next(false);
    this.loadDataFromStore();
  }

  changeStateBirthday() {
    this.isShowButtonsBirthday$.next(true);
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

  //загрузка промежуточной фотки
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
          //загрузка промежуточной data
          this.userService.demoPhotoDataBegin();
        } 
      }
    }
  }

  //кнопка edit загрузчика
  editUserPhotoButton() {
    document.getElementById('file').click();
    this.isShowButtons$.next(true);
  }

  //кнопка отмены загрузчика
  //выгружаем старое фото юзера
  cencelButtonUploader() {
    const userObject = JSON.parse(localStorage.getItem('User'));

    //получаем сохранённое ранее фото из объекта юзера
    const oldPhotoUrl = userObject.map(user => user.userphoto);

    localStorage.setItem('userphoto1', JSON.stringify(oldPhotoUrl[0]));
    //Фиксим багу с он инит
    localStorage.setItem('userphoto3', JSON.stringify(oldPhotoUrl[0]));
    
    this.userService.demoPhotoDataCencel();
    this.isShowButtons$.next(false);
  }

  //кнопка сохранения загрузчика
  //сохраняем новое фото в объект юзера
  saveButtonUploader()  {
    const getUrl = JSON.parse(localStorage.getItem('userphoto'));
    localStorage.setItem('userphoto3', JSON.stringify(getUrl));

    const changeFotoObject: UserPhoto = {
      "userphoto": getUrl
    };

    this.userService.changeFoto(changeFotoObject);
    this.userService.demoPhotoDataSave();
    this.isShowButtons$.next(false);
  }

  public changePasswordValidator(control: FormGroup): ValidationErrors | null {
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
