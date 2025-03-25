import { Router } from '@angular/router';
import { RegisterUser } from '../../authentication/shared/models/authentication.user.ts';
import { AuthService } from '../../services/auth.service.ts.service.js';
import { CoursedetailsService } from '../../services/details.service.js';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
 constructor(private authService:AuthService) {}

 courseId!:string;
 userData:RegisterUser [] = [];
 limitUserData:RegisterUser [] =[];

 ngOnInit(): void {
  this.getAllUsers();
 }

  getAllUsers() {
    this.authService.getUsers().subscribe({
      next:(response)=>{
        this.userData = response.users;
        this.limitUserData = this.userData.slice(0,5)
      },
    })
  }

}
