import { ApiResponse, Category, Course } from './../models/courseModels';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresignedUrl } from '../models/lecture';

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
  return this.http.get(`${this.API_URL}${this.section}get-section/${courseId}`);
}

deleteSection(courseId:string,sectionId:string):Observable<any> {
  return this.http.delete(`${this.API_URL}section/course/${courseId}/section/${sectionId}`)
}

editSection(courseId:string,sectionId:string,title:string):Observable<any> {
  return this.http.put(`${this.API_URL}section/course/${courseId}/section/${sectionId}`,{title})
}

getPresignedUrl(fileType:any,fileName:any,courseId:string):Observable<PresignedUrl>{
  const params = new HttpParams()
  .set('fileName',fileName)
  .set('fileType',fileType)
  .set('courseId',courseId)
  return this.http.get<PresignedUrl>(`${this.API_URL}${this.lecture}presigned-url`,{params});
}


}
