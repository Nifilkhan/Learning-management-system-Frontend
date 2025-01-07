import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoursedetailsService {

constructor(private route:Router) { }

viewCourseDetails(courseId:string){
  this.route.navigate(['admin-dashboard', 'content-section', courseId]);
}
}
