import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/shared/service/auth.service.ts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(public loggedUser:AuthService,private router:ActivatedRoute,private routers:Router){}

  userData:any;
  userId:string = ''

  ngOnInit(): void {
    this.loggedUserData();

    // this.router.paramMap.subscribe((params) => {
    //   this.userId = params.get('userId')!;
    //   console.log(this.userId)
    // })
  }

  loggedUserData(){
    this.loggedUser.getLoggedInUser().subscribe({
      next:(response) => {
        console.log(response)
        this.userData = response
        console.log('logged user data',response)
      },error:(err) => {
          console.log('error occured while getting the loggeduser data',err)
      },
    })
  }

  onForgetPassword() {
    console.log('clicked in onforget password function')
  }

  onLogout() {
    this.loggedUser.logogut().subscribe({
      next:(response) => {
        console.log('User loged out succesfully',response);
        if(response) {
          this.routers.navigate(['/signin'])
        }
      },error:(err) => {
        console.log('error occured while logout');
      },
    })
  }
}
