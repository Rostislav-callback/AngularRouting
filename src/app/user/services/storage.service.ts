import { Injectable, ElementRef} from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    public avatar$: Subject<string> = new Subject();

    constructor(private authService: AuthService) { 
    }

    saveDemoPhotoUrlOnUploader(dom) {
        const photo = JSON.parse(localStorage.getItem('userphoto'));
        
        dom.setAttribute('src', photo);
    }
    
    savePhotoUrlOnCencelButton(dom) {
        const photo1 = JSON.parse(localStorage.getItem('userphoto'));
        
        dom.setAttribute('src', photo1);
    }
    
    savePhotoUrlOnSaveButton(dom) {
        const photo2 = JSON.parse(localStorage.getItem('userphoto'));
        
        dom.setAttribute('src', photo2);
    }
    
    saveFinishedPhotoUrl(dom) {
        const photo3 = JSON.parse(localStorage.getItem('userphoto'));
    
        dom.setAttribute('src', photo3);
    }
}