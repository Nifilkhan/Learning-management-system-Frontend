import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LectureService } from '../shared/services/lecture.service';
import { CourseService } from '../shared/services/course.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture-component.component.html',
  styleUrl: './lecture-component.component.scss'
})
export class LectureComponent implements OnInit {
  @Input() lectureGroup!: FormGroup;
  @Input() courseId!: string;
  @Input() sectionId!: string;

  constructor(private fb:FormBuilder,private lectureService:LectureService,private courseService:CourseService) {}


  ngOnInit(): void {
    this.onContentTypeChange();
    this.initializeFromControls();
  }

  initializeFromControls() {
    this.lectureGroup.addControl('title',this.fb.control('',Validators.required));
    this.lectureGroup.addControl('contentType',this.fb.control('',Validators.required));
    this.lectureGroup.addControl('description',this.fb.control('',Validators.required));
  }

  onContentTypeChange() {
    const contentType = this.lectureGroup.get('contentType')?.value;
    if (contentType === 'video') {
      this.lectureGroup.addControl('videoUrl', this.fb.control('', Validators.required));
      this.lectureGroup.removeControl('articleContent');
    } else if (contentType === 'article') {
      this.lectureGroup.addControl('articleContent', this.fb.control('', Validators.required));
      this.lectureGroup.removeControl('videoUrl');
    }
  }

   // Handle file input change for video
   onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0] || null;
    this.lectureGroup.get('content')?.setValue(file); // Set the file to the content control
  }


  async saveLecture() {
    try{
    const title = this.lectureGroup.get('title')?.value;
    const contentType = this.lectureGroup.get('contentType')?.value;
    const description = this.lectureGroup.get('description')?.value;

    let videoUrl = this.lectureGroup.get('videoUrl')?.value;
    let articleContent = this.lectureGroup.get('articleContent')?.value;


    if(contentType === 'video' && videoUrl instanceof File) {
      const { url, videoUrl:uploadedVideoUrl } = await firstValueFrom(
        this.lectureService.getPreSignedUrl(videoUrl.name, videoUrl.type, this.courseId)
      );
      // Upload the video to S3
      await firstValueFrom(this.lectureService.uploadToS3(url, videoUrl));
      videoUrl = uploadedVideoUrl; // Set the video URL for backend submission
    }

    const lecture = {
      title,
      contentType,
      videoUrl:contentType === 'video' ? videoUrl : undefined,
      articleContent:contentType === 'article' ? articleContent : undefined,
      description
    };

  console.log(lecture, 'value in the after subscribing');


    // const sectionId = this.lectureGroup.get('id')?.value;
    await firstValueFrom(this.courseService.addLecture(lecture,this.sectionId));

    const lectures = this.lectureGroup.get('lectures') as FormArray ?? [];

    lectures.push(this.fb.group({
      title:[title],
      contentType:[contentType],
      videoUrl:[videoUrl],
      articleContent:[articleContent],
      description:[description]
    }));


    console.log(lectures,'value in the lecture formarray after subscribing');


    this.lectureGroup.get('showAddLecture')?.setValue(false);
  } catch(error) {
    console.error(error);
  }
}


}
