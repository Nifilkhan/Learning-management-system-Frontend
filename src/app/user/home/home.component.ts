import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.ts.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck,OnInit {

 constructor(private route:Router,private authService:AuthService) {}

 showContent:boolean = true;
 isAuthenticated:boolean = false;

 ngOnInit(): void {

 }

//  googleLogin(){
//   this.authService.isAuthenticated().subscribe({
//     next:(resposne) => {
//       console.log('repsone from callback verify:', resposne);
//       this.isAuthenticated = resposne;
//       console.log('Is User Authenticated:', this.isAuthenticated);
//     },
//     error: (err) => {
//       console.log('Error fetching authentication state:', err);
//       this.isAuthenticated = false;
//     },
//   })
//  }
  ngDoCheck():void {
    const currentRoute = this.route.url.split('?')[0]; // Removing query params
    this.showContent = currentRoute === '/home';
  }





}
