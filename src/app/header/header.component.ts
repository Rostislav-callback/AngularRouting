import { AfterViewInit, Component, OnInit, ElementRef, ViewChild} from '@angular/core';

import { BehaviorSubject, Subject, combineLatest, Observable} from 'rxjs';
import { map } from 'rxjs/operators';


import { AuthService } from '../auth/services/auth.service';
import { StorageService } from '../user/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('getPhoto', {static: false}) getPhoto: ElementRef;

  public isResponse$: BehaviorSubject<boolean>;
  
  combine$: Observable<{isResponse: boolean, avatar: string}>;
  avatar$: Subject<string>;

  constructor(private authService: AuthService,
              private storageService: StorageService) {
    this.isResponse$ = this.authService.isResponse$;
    this.avatar$ = this.storageService.avatar$;
    this.authCheck();
    this.photoCheck();
  }

  public logoutChange() {
    this.authService.logout();
  }

  //Проверка юзера для правильного эмита значения
  //для отработки combineLatest
  authCheck() {
    const auth = JSON.parse(localStorage.getItem('isAuth'));
    
    if (auth === true) {
      this.isResponse$.next(true);
      console.log(this.isResponse$);
    } else {
      this.isResponse$.next(false);
      console.log(this.isResponse$);
    }
  }

  photoCheck() {
    const photo = JSON.parse(localStorage.getItem('userphoto'));
    this.avatar$.next(photo);
    console.log(this.avatar$);
  }

  ngOnInit(): void {
    this.combine$ = combineLatest([this.isResponse$, this.avatar$])
      .pipe(
        map(([isResponse, avatar]) => {
          const obj = {isResponse, avatar}; 

          return obj;
      })
    )
  }

  ngAfterViewInit(): void {
    this.photoCheck();
    this.authCheck();
  }
}
