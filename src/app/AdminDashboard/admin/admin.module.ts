import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
import { SectionComponent } from '../section-component/section-component.component';
import { LectureComponent } from '../lecture-component/lecture-component.component';
import { SectionManagementComponent } from '../section-management/section-management.component';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from '../../store/course/course.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from '../../store/course/course.effects';
import { OverlayComponent } from "../../shared/overlay/overlay.component";


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
    TableComponent,
    SectionManagementComponent,
    SectionComponent,
    LectureComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFileDropModule,
    NgxDatatableModule,
    StoreModule.forFeature('courses', courseReducer), // ✅ Feature store
    EffectsModule.forFeature([CourseEffects]),
    AsyncPipe,
    OverlayComponent
]
})
export class AdminModule { }
