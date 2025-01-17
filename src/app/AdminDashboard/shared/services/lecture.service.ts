import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { Lecture, PresignedUrl } from '../models/lecture';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http:HttpClient,private courseService:CourseService) { }

  private LECTURE_URL = environment.COURSE_API
  lectures = 'lecture/'

  getPreSignedUrl(fileType:string,fileName:string,fileCategory:string):Observable<PresignedUrl> {
    return this.courseService.getPresignedUrl(fileName,fileType,fileCategory);
  }

  uploadToS3(preSignedUrl:string,file:File):Observable<void> {
    console.log('upload file',file);
    console.log('upload file type',file.type)
    return this.http.put<void>(preSignedUrl,file, {
      headers: {
        'Content-Type': file.type
      }
    })
  }

  addLecture(lecture:Lecture,sectionId:string) {
    console.log(lecture,sectionId,'value in the api before subscribing')
    return this.http.post(`${this.LECTURE_URL}${this.lectures}sections/${sectionId}/addLecture`, lecture);
  }

  getLecture(lectureId:string):Observable<{lecture:Lecture}> {
    return this.http.get<{lecture:Lecture}>(`${this.LECTURE_URL}${this.lectures}getLecture/${lectureId}`);
  }

  deleteLecture(lectureId:String): Observable<any> {
    return this.http.delete(`${this.LECTURE_URL}${this.lectures}delete-lecture${lectureId}`)
  }

}
