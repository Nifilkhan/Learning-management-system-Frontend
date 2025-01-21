import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseComponent } from '../course/course.component';
import { HeaderComponent } from '../header/header.component';
import { BannerSectionComponent } from '../banner-section/banner-section.component';
import { LatestCourseComponent } from '../latest-course/latest-course.component';


@NgModule({
  declarations: [
    HomeComponent,
    CourseDetailsComponent,
    CourseComponent,
    HeaderComponent,
    BannerSectionComponent,
    LatestCourseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class HomeModule { }
