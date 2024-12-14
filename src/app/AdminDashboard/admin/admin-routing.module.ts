import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OverviewComponent } from '../overview/overview.component';
import { StudentsComponent } from '../students/students.component';
import { CoursesComponent } from '../courses/courses.component';
import { MessageComponent } from '../message/message.component';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { SectionManagementComponent } from '../section-management/section-management.component';

const routes: Routes = [
  {
    path:'admin-dashboard',component:AdminComponent ,children : [
      {
        path:'',redirectTo:'overview',pathMatch:'full'
      },
      // {
      //   path:'card',component:CardComponent
      // },
      {
        path:'overview',component:OverviewComponent
      },
      {
        path:'students',component:StudentsComponent
      },
      {
        path:'courses',component:CoursesComponent
      },
      {
        path:'messages',component:MessageComponent
      },
      {
        path:'recent-activities', component:RecentActivitiesComponent
      },
      {
        path:'content-section/:courseId', component:SectionManagementComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
