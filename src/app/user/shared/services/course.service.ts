import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

constructor(private http:HttpClient) { }

private API_URL = environment.COURSE_API;
readonly course = 'courses'

getCourse(courseId:string):Observable<{ course:Course}>{
  return this.http.get<{ course:Course}>(`${this.API_URL}${this.course}/get-course/${courseId}`)
}

getLatestCourse():Observable<{latestCourses:Course[]}>{
  return this.http.get<{latestCourses:Course[]}>(`${this.API_URL}${this.course}/latest-courses`)
}
}
