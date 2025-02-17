import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/model/course';
import { CourseService } from '../../services/course.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-latest-course',
  templateUrl: './latest-course.component.html',
  styleUrl: './latest-course.component.scss'
})
export class LatestCourseComponent implements OnInit {

  latestCourses:Course[]=[];
  courseThumbnail:string [] = [];

  constructor(private latestCourseService:CourseService) {}

  ngOnInit(): void {
    this.latestCourse();
  }

  latestCourse(){
    this.latestCourseService.getLatestCourse().subscribe({
      next:(response) => {
        this.latestCourses = response.latestCourses;
        this.courseThumbnail = this.latestCourses.map((course) => `${environment.AWS_S3_URL}${course.thumbnail}`)
      },
    })
  }
}
