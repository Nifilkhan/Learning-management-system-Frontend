import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AdminComponent } from './AdminDashboard/admin/admin.component';
import { HomeComponent } from './User/home-component/home-component.component';

const routes: Routes = [
  {
    path:'',redirectTo:'signin',pathMatch:'full'
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'otp',component:OtpVerificationComponent
  },
  {
    path:'signin',component:SigninComponent
  },
  {
    path:'Admin-dashboard',component:AdminComponent
  },
  {
    path:'home',component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
