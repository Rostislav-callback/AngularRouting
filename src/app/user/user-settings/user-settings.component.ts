import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { FirstName } from '../interfaces/username.interface';
import { LastName } from '../interfaces/lastname.interface';
import { ChangePassword } from '../interfaces/changepassword.interface';
import { Birthday } from '../interfaces/birthday.interface';
import { UserPhoto } from '../interfaces/userphoto.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('uploadPhoto', {static: false}) uploadPhoto: ElementRef;

  public userInfoForm: FormGroup;
  public getLname = JSON.parse(localStorage.getItem('lastname'));

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.demoFirstNameData();
    this.userService.demoLastNameData();
    this.userService.demoBirthdayData();
    this.userService.demoPhotoData();

    this.initForm();
  }

  demoData() {
    this.userService.demoFirstNameData();
  }

  setFirstName() {
    const firstNameObject: FirstName = { 
      "firstName":  this.userInfoForm.value.firstName
    };

    localStorage.setItem('firstname', JSON.stringify(this.userInfoForm.value.firstName));
    this.userService.firstName(firstNameObject);
    this.userService.demoFirstNameData();
  }

  setLastName() {
    const lastNameObject: LastName = { 
      "surname":  this.userInfoForm.value.lastName
    };

    this.userService.lastName(lastNameObject);
    this.userService.demoLastNameData();

    localStorage.setItem('lastname', JSON.stringify(this.userInfoForm.value.lastName));
  }

  setBirthday() {
    const birthdayObject: Birthday = { 
      "birthdayDate":  this.userInfoForm.value.changeBirth
    };

    this.userService.birthday(birthdayObject);
    this.userService.demoBirthdayData();

    localStorage.setItem('birthdaydate', JSON.stringify(this.userInfoForm.value.changeBirth));
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
    const getUrl = JSON.parse(localStorage.getItem('userphoto'));

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
          this.userService.demoPhotoData();
        } 
      }
    }

    const changeFotoObject: UserPhoto = {
      "userphoto": getUrl
    };

    this.userService.changeFoto(changeFotoObject);
    //this.cd.detectChanges();
  }

  editUserPhotoButton() {
    document.getElementById('file').click();
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
