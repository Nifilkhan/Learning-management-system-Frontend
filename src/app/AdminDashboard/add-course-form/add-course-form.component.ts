import { PresignedUrl } from './../shared/models/lecture';
import { response } from 'express';
import { Category } from './../../user/shared/model/course';
import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  output,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { File } from 'buffer';
import { Course } from '../shared/models/courseModels';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LectureService } from '../shared/services/lecture.service';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.scss',
})
export class AddCourseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private addCourse: CourseService,
    private route: Router,
    private PresignedUrl:LectureService
  ) {
    console.log('Available Routes:', this.route.config);
  }

  createCourse!: FormGroup;
  @Output() formVisibility = new EventEmitter<void>();
  currentfile?: File;
  categories: Category[] = [];

  closeForm() {
    this.formVisibility.emit();
  }

  ngOnInit() {
    this.getCategory();
    this.createForm();
    // console.log(this.createCourse.value);
  }

  async getCategory() {
    try {
      const response = await lastValueFrom(this.addCourse.getCategory());
      this.categories = response?.categories;
      console.log('Categories fetched:', this.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  createForm() {
    this.createCourse = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      thumbnail:['',Validators.required],
    });

    console.log(this.createCourse.value);
  }

 async onChangeImage(event:Event) {
    const inputFile = event.target as HTMLInputElement;
    const file = inputFile.files?.[0] || null;

    if(file) {
      try {
        const {type:fileType,name:fileName} = file;
        const courseId = this.createCourse.value.category;
        console.log('file type',fileType);
        console.log('file name',fileName)

        const response = await lastValueFrom(
          this.PresignedUrl.getPreSignedUrl(fileName,fileType,courseId,'thumbnail')
        );
        console.log('response from the event file',response)

        await lastValueFrom(
          this.PresignedUrl.uploadToS3(response.preSignedUrl,file)
        )
        this.createCourse.patchValue({thumbnail:response.videoUrl});
        console.log('Thumbnail uploaded successfully');
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
    }
  }
  async submitForm() {
    if (this.createCourse.invalid) {
      return;
    }

    const formData: Course = this.createCourse.value;
    try {
      const response = await lastValueFrom(this.addCourse.uploadCourse(formData));
      console.log('Course uploaded successfully');
      const courseId = response?.course._id; // Adjust this to match your backend response structure
      if (!courseId) {
        console.error('Course ID is undefined. Navigation aborted.');
        return;
      }

      this.route.navigate(['admin-dashboard', 'content-section', courseId]);
      this.closeForm();
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  }
}
