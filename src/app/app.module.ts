import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    OtpVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
