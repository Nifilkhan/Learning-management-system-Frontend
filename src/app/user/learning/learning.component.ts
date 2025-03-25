import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/model/course';
import { CourseService } from '../../services/course.service';
import { environment } from "../../../environments/environment.development";
import { Router } from '@angular/router';


@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.scss'
})
export class LearningComponent implements OnInit{

  constructor(private purchasedService:CourseService, private router:Router) {}

  purchasedCoursec:Course[] = [];
  imageUrl:string [] = [];
  courseId!:string;

  ngOnInit(): void {
    this.getCourse();
  }

  onClick(courseId:string) {
    this.router.navigate(['home/courseDetail',courseId])
  }

  getCourse() {
    this.purchasedService.getPurcahsedCourses().subscribe({
      next:(response) => {
        this.purchasedCoursec = response.purchased;

        this.imageUrl = this.purchasedCoursec.map(course => {
          return `${environment.AWS_S3_URL}${course.thumbnail}`
        })

      },error:(err) => {
        console.log('error in the learning component',err)
      },
    })
  }
}
