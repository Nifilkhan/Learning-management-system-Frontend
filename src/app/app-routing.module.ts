import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './user/home/home.component';
import { ErrorDialogComponent } from './error-handler/error-dialog.component.ts/error-dialog.component.ts.component';

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
    path:'home',component:HomeComponent
  },
  {
    path:'admin-Dasboard',loadChildren: () => import('./AdminDashboard/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path:'edutech',loadChildren: () => import('./user/home/home.module').then((m) => m.HomeModule)
  },
  {
    path:'error/:code', component:ErrorDialogComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
