import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../shared/model/user-data';
import { Observable, Subject } from 'rxjs';
import { Course } from '../../shared/model/course';
import { Store } from '@ngrx/store';
import { loadCourse } from '../../../store/course/course.action';
import { selectAllCourses, selectSearchQuery } from '../../../store/course/course.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  constructor(public loggedUser:AuthService,private router:ActivatedRoute,private routers:Router,private store:Store){}
  userData:{user:UserData} | null = null;
  userId:string | null = null;
  private searchSubject = new Subject<string>()

  searchQuery: string = '';
  category: string = '';
  limit: number = 10;
  offset: number = 0;

  private setTimeout: any;

  get courseData$(): Observable<Course[]> {
    return this.store.select(selectAllCourses);
  }

  onLoadSearc() {
    console.log('search query',this.searchQuery);
    console.log('category',this.category)
    this.routers.navigate(['/home/courses'],{queryParams:{search:this.searchQuery}})
    this.store.dispatch(loadCourse({search:this.searchQuery,limit:this.limit,category:this.category,offset:this.offset}))
  }

  onQueryChange() {
    if(this.setTimeout) {
      clearTimeout(this.setTimeout)
    }
    this.setTimeout = setTimeout(() => {
      this.onLoadSearc();
    },300)
  }


  ngAfterViewInit(): void {
      this.loggedUserData();
  }

  loggedUserData(){
    this.loggedUser.getLoggedInUser().subscribe({
      next:(response) => {
        this.userData = response
        this.userId = response.user._id ?? null;
      },
      error:(err) => {
        if(err.status === 401) {
          this.routers.navigate(['/signin'])
        }
      },
    })
  }

  googleLogin() {
    this.loggedUser.isAuthenticated().subscribe({
      next:(response) => {
        console.log('the response from google logged user',response)
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
