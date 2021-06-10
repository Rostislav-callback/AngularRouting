import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    constructor() {}

    saveDemoPhotoUrlOnUploader() {
        const photo = JSON.parse(localStorage.getItem('userphoto'));
    
        document.getElementById('photo').setAttribute('src', photo);
    }
    
    savePhotoUrlOnCencelButton() {
        const photo1 = JSON.parse(localStorage.getItem('userphoto1'));
    
        localStorage.setItem('userphoto', JSON.stringify(photo1));
    
        document.getElementById('photo').setAttribute('src', photo1);
        document.getElementById('photo1').setAttribute('src', photo1);
    }
    
    savePhotoUrlOnSaveButton() {
        const photo = JSON.parse(localStorage.getItem('userphoto'));
    
        document.getElementById('photo').setAttribute('src', photo);
        document.getElementById('photo1').setAttribute('src', photo);
    }
    
    saveFinishedPhotoUrl() {
        const photo2 = JSON.parse(localStorage.getItem('userphoto2'));
    
        document.getElementById('photo').setAttribute('src', photo2);
        document.getElementById('photo1').setAttribute('src', photo2);
    }
    
    uploadingPhotoInHeader() {
        const photo = JSON.parse(localStorage.getItem('userphoto'));
    
        document.getElementById('photo1').setAttribute('src', photo);
        document.getElementById('photo1').setAttribute('src', photo);
    }
}