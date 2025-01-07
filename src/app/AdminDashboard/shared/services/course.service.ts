import { ApiResponse, Category, Course, section } from './../models/courseModels';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lecture } from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

constructor(private http:HttpClient) { }

private API_URL  = environment.COURSE_API;
course = 'courses/'
section = 'section/'
lecture = 'lecture/'
uploadCourse(courseData:Course):Observable<any>{
  console.log(courseData);
  return this.http.post(`${this.API_URL}${this.course}add-course`,courseData)
}

getCourses():Observable<any> {
  return this.http.get(`${this.API_URL}${this.course}all-courses`)
}

getCategory():Observable<ApiResponse<Category>> {
  return this.http.get<ApiResponse<Category>>(`${this.API_URL}courses/get-category`)
}

addSection(title: string, courseId: string): Observable<any> {
  return this.http.post(`${this.API_URL}section/addSection/${courseId}`, { title });
}

getSections(courseId: string): Observable<any> {
  return this.http.get(`${this.API_URL}section/get-section/${courseId}`);
}

deleteSection(courseId:string,sectionId:string):Observable<any> {
  return this.http.delete(`${this.API_URL}section/course/${courseId}/section/${sectionId}`)
}

editSection(courseId:string,sectionId:string,title:string):Observable<any> {
  return this.http.put(`${this.API_URL}section/course/${courseId}/section/${sectionId}`,{title})
}

getPresignedUrl(fileType:string,fileName:string,courseId:string) {
  return this.http.get(`${this.API_URL}${this.lecture}/get-presigned-url`,{
    params:{
      fileType,
      fileName,
      courseId
    }
  });
}


addLecture(lecture:Lecture,sectionId:string) {
  console.log(lecture,sectionId,'value in the api before subscribing')
  return this.http.post(`${this.API_URL}${this.lecture}sections/${sectionId}/addLecture`, lecture);
}

getLecture(lectureId:string):Observable<Lecture> {
  return this.http.get<Lecture>(`${this.API_URL}${this.lecture}getLecture/${lectureId}`);
}


}
