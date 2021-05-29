import { AfterViewInit, Component, OnInit} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public isResponse$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService,
    private userService: UserService) {
    this.isResponse$ = this.authService.isResponse$;
  }

  public logoutChange() {
    this.authService.logout();
  }

  ngOnInit(): void {
    //this.userService.headerPhoto();
  }

  ngAfterViewInit() {
    this.userService.headerPhoto();
  }
}
