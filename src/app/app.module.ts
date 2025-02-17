import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service.ts.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminModule } from './AdminDashboard/admin/admin.module';
import { HomeModule } from './user/home/home.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedOverlayComponent } from './AdminDashboard/shared/shared-overlay/shared-overlay.component';
import { authInterceptor } from './shared/interceptor/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CourseService } from './services/course.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    OtpVerificationComponent,
    SharedOverlayComponent,
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
    AdminModule,
    HomeModule,
    MatSnackBarModule,
    StoreModule.forRoot({},{}),
    EffectsModule.forRoot([]),
    // StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    AuthService,
    CourseService,
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
