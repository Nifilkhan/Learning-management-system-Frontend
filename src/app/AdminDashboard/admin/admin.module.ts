import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { StudentsComponent } from '../students/students.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardComponent } from '../card/card.component';
import { RouterOutlet } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { AdminComponent } from './admin.component';
import { MessageComponent } from '../message/message.component';
import { OverviewComponent } from '../overview/overview.component';
import { MatButtonModule } from '@angular/material/button';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { CourseEnrollmentChartComponent } from '../course-enrollment-chart/course-enrollment-chart.component';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';


@NgModule({
  declarations: [
    StudentsComponent,
    CoursesComponent,
    AdminComponent,
    MessageComponent,
    OverviewComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    RecentActivitiesComponent,
    CourseEnrollmentChartComponent,
    AddCourseFormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
