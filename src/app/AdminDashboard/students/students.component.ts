import { UserData } from './../../user/shared/model/user-data';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';
import { RegisterUser } from '../../authentication/shared/models/authentication.user.ts';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private authService:AuthService) { }
  UserData:RegisterUser [] = [];

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.authService.getUsers().subscribe({
      next:(value) => {
        this.UserData = value.users
      },
    })
  }
}
