import { Directive, HostListener, ElementRef, Input, Output, ViewChild} from '@angular/core';

import { UserService } from '../services/user.service';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Directive({
  selector: '[hideButtons]'
})
export class SettingsDirective {

  @HostListener('document:click', ['$event'])
	onClick(event: Event) {
		if (!this.el.nativeElement.contains(event.target)) {
      this.userService.isInputStateFalse();
      document.getElementById('first').style.visibility = 'hidden';
      document.getElementById('second').style.visibility = 'hidden';
      document.getElementById('birth').style.visibility = 'hidden';
		}
	}
  
  constructor(private el: ElementRef,
              private userService: UserService) { }
}
