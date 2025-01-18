import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/shared/service/auth.service.ts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(public loggedUser:AuthService){}

  userName:string = '';
  userEmail:string = '';

  ngOnInit(): void {
    this.loggedUserData;
  }

  loggedUserData(){
    this.loggedUser.getLoggedInUser().subscribe({
      next:(response) => {
        console.log(response)
        // this.userName = response.name;
        // this.userEmail = response.email;
        console.log('logged user data',response)
      },
    })
  }

  onForgetPassword() {
    console.log('clicked in onforget password function')
  }

  onLogout() {
    console.log('pressed in onlogout fucntion')
  }
}
