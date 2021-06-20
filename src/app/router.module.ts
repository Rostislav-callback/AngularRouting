import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'settings', component: UserSettingsComponent}
    ]),
    CommonModule
  ],
  exports: [
    RouterModule
  ] 
})
export class RoutersModule { }
