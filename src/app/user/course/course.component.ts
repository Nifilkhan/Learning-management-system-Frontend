import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../AdminDashboard/shared/services/course.service';
import { Router } from '@angular/router';
import { Course } from '../shared/model/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

   constructor(private courseService:CourseService, private route:Router) { }

   courseData:Course [] = [];

   ngOnInit(): void {
       this.getCourse();
   }

  getCourse() {
    this.courseService.getCourses().subscribe({
      next:(response) => {
        this.courseData = response.courses;
      },
    })
  }

  onClick(courseId:string) {
    this.route.navigate(['home/courseDetail',courseId])
  }
}
