import { Directive, HostListener, ElementRef} from '@angular/core';

import { UserService } from '../services/user.service';

@Directive({
  selector: '[hideButtons]'
})
export class SettingsDirective {

  @HostListener('document:click', ['$event'])
	onClick(event: Event) {
    let nodeList = [];
    
		if (!this.el.nativeElement.contains(event.target)) {
      this.userService.changeInputStateFalse();

      nodeList = this.el.nativeElement.querySelectorAll(".ref")
      nodeList.forEach(elem => elem.style.visibility = 'hidden');
		}
	}
  
  constructor(private el: ElementRef,
              private userService: UserService) { }
}
