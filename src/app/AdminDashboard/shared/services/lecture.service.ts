import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http:HttpClient,private courseService:CourseService) { }

  getPreSignedUrl(fileType:string,fileName:string,courseId:string):Observable<any> {
    return this.courseService.getPresignedUrl(fileName,fileType,courseId);
  }

  uploadToS3(preSignedUrl:string,file:File):Observable<void> {
    return this.http.put<void>(preSignedUrl,file, {
      headers: {
        'Content-Type': file.type
      }
    })
  }


}
