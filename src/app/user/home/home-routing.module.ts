import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseComponent } from '../course/course.component';
import { HomeComponent } from './home.component';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
