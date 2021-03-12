import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { Login } from "../auth/interfaces/login.interface";
import { Signup } from '../auth/interfaces/signup.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isResponse$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.isResponse$ = this.authService.isResponse$;
  }

  public logoutChange() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
