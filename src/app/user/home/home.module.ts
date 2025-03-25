import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseComponent } from '../course/course.component';
import { HeaderComponent } from '../header-sec/header/header.component';
import { BannerSectionComponent } from '../banner-section/banner-section.component';
import { LatestCourseComponent } from '../latest-course/latest-course.component';
import { UserProfileComponent } from '../header-sec/user-profile/user-profile.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { AddCartComponent } from '../cart/add-cart/add-cart.component';
import { LearningComponent } from '../learning/learning.component';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from '../../shared/overlay/overlay.component';
import { CategoryBannerComponent } from '../category-banner/category-banner.component';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { CartDialogeComponent } from '../cart-dialoge/cart-dialoge.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    CourseDetailsComponent,
    CourseComponent,
    HeaderComponent,
    BannerSectionComponent,
    LatestCourseComponent,
    UserProfileComponent,
    CourseListComponent,
    VideoPlayerComponent,
    AddCartComponent,
    LearningComponent,
    CategoryBannerComponent,
    CartDialogeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    OverlayComponent,
    MatButtonModule,
    MatPaginatorModule,
    SkeletonComponent,
    MatDialogModule
  ]
})
export class HomeModule { }
