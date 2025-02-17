import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseComponent } from '../course/course.component';
import { HomeComponent } from './home.component';
import { AddCartComponent } from '../cart/add-cart/add-cart.component';
import { LearningComponent } from '../learning/learning.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent, children:[
      {
        path:'',redirectTo:'home',pathMatch:'full'
      },
      {
        path:'courses',component:CourseComponent
      },
      {
        path:'courseDetail/:courseId',component:CourseDetailsComponent
      },
      {
        path:'cart',component:AddCartComponent
      },
      {
        path:'my-learning',component:LearningComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
