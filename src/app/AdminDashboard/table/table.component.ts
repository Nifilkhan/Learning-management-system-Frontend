import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../user/shared/model/course';
import { CoursedetailsService } from '../../services/details.service';

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
    this.courseService.getAllCourse().subscribe({
      next:(response) => {
        // console.log('get course rewuest fro table:',response)
        this.courses = response.courses.slice(0,5);
      },error:(error) => {
        console.log('error ocured while getting the coure',error)
      }
    })
  }




}
