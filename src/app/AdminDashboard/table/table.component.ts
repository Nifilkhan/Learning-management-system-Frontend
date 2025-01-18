import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/services/course.service';
import { Course } from '../shared/models/courseModels';
import { CoursedetailsService } from '../shared/services/course.details.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private courseService:CourseService,private courseDetail:CoursedetailsService){}
  courses:Course[]= [];
  courseId!:string;

  ngOnInit(): void {
      this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().subscribe({
      next:(response) => {
        // console.log('get course rewuest fro table:',response)
        this.courses = response.courses;
      },error:(error) => {
        console.log('error ocured while getting the coure',error)
      }
    })
  }




}
