import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseService } from './services/course.service';
import { OverlayComponent } from './shared/overlay/overlay.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-handler/error-dialog.component.ts/error-dialog.component.ts.component';
import { errorHandlingInterceptor } from './error-handler/interceptor/error-handling.interceptor';
import { SkeletonComponent } from "./shared/skeleton/skeleton.component";
import { PaymentProcessingComponent } from './user/payment-processing/payment-processing.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    OtpVerificationComponent,
    ErrorDialogComponent,
    PaymentProcessingComponent,
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
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    OverlayComponent,
    MatDialogModule,
    SkeletonComponent
],
  providers: [
    AuthService,
    CourseService,
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([errorHandlingInterceptor])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
