import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CourseService } from '../../services/course.service';

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
  isLoading:boolean = false;

  ngOnInit(): void {
    this.totalUsers();
  }

  toggelForm() {
    this.showForm = !this.showForm;
  }

  totalUsers():void {
    this.isLoading = true
    this.userService.getTotalCount().subscribe({
      next:(response) =>{
        console.log(response)
        this.totalCourses();
        this.totelUsers = response.totalCount;
        this.isLoading = false;
      },error:(err) => {
        this.isLoading = false;
        console.log(err)
      },
    })
  }

  totalCourses():void {
    // this.isLoading = true
    this.courseService.getCourses().subscribe({
      next:(response) => {
        // this.isLoading = false
        console.log(response)
        this.totalCourse = response.totalCourses;
      },error:(err)=> {
        console.log(err)
        // this.isLoading = false
      },
    })
  }

}
