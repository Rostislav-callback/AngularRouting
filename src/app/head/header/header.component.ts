import { AfterViewInit, Component, OnInit} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import { StorageService } from '../../user/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public isResponse$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService,
              private storageService: StorageService) {
    this.isResponse$ = this.authService.isResponse$;
  }

  public logoutChange() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.storageService.uploadingPhotoInHeader();
  }
}
