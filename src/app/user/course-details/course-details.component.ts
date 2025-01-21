import { response } from 'express';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { CourseService } from '../shared/services/course.service';
import { Course } from '../shared/model/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {

  courseId!:string;
  courses!:Course;
  constructor(private route:ActivatedRoute,private courseService:CourseService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.courseId = params.get('courseId')!
    })
    this.getCourseDetails();
  }

  getCourseDetails() {
    this.courseService.getCourse(this.courseId).subscribe({
      next:(response) => {
        this.courses = response.course;
        // console.log(response)
      },
    })
  }
}
