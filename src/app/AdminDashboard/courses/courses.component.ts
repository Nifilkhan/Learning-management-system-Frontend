import { CourseService } from './../shared/services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/models/courseModels';
import { CoursedetailsService } from '../shared/services/course.details.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private course:CourseService, private courseDetails:CoursedetailsService) { }

  courseData:Course [] = [];

  ngOnInit() {
    this.getCourse();
  }


  getCourse(){
    this.course.getCourses().subscribe(response => {
      this.courseData = response.courses;
    })
  }

  onClick(courseId:string){
    console.log("course id in the onclick method of addCourse",courseId);
    this.courseDetails.viewCourseDetails(courseId);
  }
}
