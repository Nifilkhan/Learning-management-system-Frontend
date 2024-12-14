import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from './authentication/shared/service/auth.service.ts.service';
import { HomeComponent } from './User/home-component/home-component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminModule } from './AdminDashboard/admin/admin.module';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    OtpVerificationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    AdminModule
  ],
  providers: [
   AuthService,provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
