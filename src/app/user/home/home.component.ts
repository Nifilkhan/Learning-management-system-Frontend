import { response } from 'express';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Course } from '../shared/model/course';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck {

 constructor(private route:Router) {}

 showContent:boolean = true;


  ngDoCheck():void {
    const currentRoute = this.route.url.split('?')[0]; // Removing query params
    this.showContent = currentRoute === '/home';
    // console.log('Route after checking:', currentRoute);
    // console.log('Show Banner:', this.showContent);
  }



}
