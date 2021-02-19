import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    AboutUsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
