import { CourseService } from '../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../user/shared/model/course';
import { CoursedetailsService } from '../../services/details.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadCourse } from '../../store/course/course.action';
import { selectAllCourses, selectCourseLoadingState } from '../../store/course/course.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses$!:Observable<Course[]>;
  loading$!:Observable<boolean>;
  totalCourses$!:Observable<number>
  currentPage$!:Observable<number>
  totalPage$!:Observable<number>


  searchQuery: string = '';
  category: string = '';
  limit: number = 10;
  offset: number = 0;

  constructor(private courseService:CourseService, private store:Store) { }

  courseData:Course [] = [];
  isFormVisible = false;
  courseId: string | null = null;

  ngOnInit() {
    this.getCourse();
  }


  getCourse(){
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCourseLoadingState);
  }


  loadStore() {
    this.store.dispatch(loadCourse({search:this.searchQuery, category:this.category, offset:this.offset, limit:this.limit}));
  }


  onClick(courseId:string){
    console.log("course id in the onclick method of addCourse",courseId);
    this.courseId = courseId;
    this.isFormVisible = true;
  }

  deleteCourse(courseId:string){
    this.courseService.deleteCourse(courseId).subscribe({
      next:(response) =>{
        console.log(response);
        this.getCourse();
      },error(err) {
          console.log('error occured while deleting the course',err)
      },
    })
  }

  toggleFormVisibility(){
    this.isFormVisible = !this.isFormVisible;
  }
}
