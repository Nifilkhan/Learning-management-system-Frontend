import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseComponent } from '../course/course.component';
import { HeaderComponent } from '../header/header.component';
import { BannerSectionComponent } from '../banner-section/banner-section.component';


@NgModule({
  declarations: [
    HomeComponent,
    CourseDetailsComponent,
    CourseComponent,
    HeaderComponent,
    BannerSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconButton,
    MatIconModule,
  ]
})
export class HomeModule { }
