import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private searchApi:CourseService){}
  query:string = ''

  getSearchData() {
    this.searchApi.getCourses().subscribe({
      next:(response) => {
        console.log(response)
      }
    })
  }
}
