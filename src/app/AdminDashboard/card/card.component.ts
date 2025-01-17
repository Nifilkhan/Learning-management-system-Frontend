import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { CourseService } from '../shared/services/course.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  constructor(private userService:UsersService,private courseService:CourseService) {}

  showCard:boolean = false;
  showForm:boolean = false;
  totelUsers!:number;
  totalCourse!:number;

  ngOnInit(): void {
    this.totalUsers();
  }

  toggelForm() {
    this.showForm = !this.showForm;
  }

  totalUsers():void {
    this.userService.getTotalCount().subscribe({
      next:(response) =>{
        console.log(response)
        this.totalCourses();
        this.totelUsers = response.totalCount;
      },
    })
  }

  totalCourses():void {
    this.courseService.getTotalCount().subscribe({
      next:(response) => {
        console.log(response)
        this.totalCourse = response.totalCourses;
      },
    })
  }

}
