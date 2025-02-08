import { environment } from './../../../environments/environment.development';
import { Category } from './../../user/shared/model/course';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
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
  @Input() courseId:string | null = null;
  @Output() formVisibility = new EventEmitter<void>();
  categories: Category[] = [];
  imagePreview:string | ArrayBuffer | null | undefined = null;
  selectedImage:File | null = null
  editMode=false

  closeForm() {
    this.formVisibility.emit();
  }

  ngOnInit() {
    this.getCategory();
    this.createForm();
    if(this.courseId){
      this.loadCourses(this.courseId)
    }
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
      title: ['', [Validators.required,Validators.minLength(5)]],
      category: ['', Validators.required],
      description: ['', [Validators.required,Validators.minLength(10)]],
      price: ['', [Validators.required,Validators.minLength(3)]],
      thumbnail:['',Validators.required],
    });

    console.log(this.createCourse.value);
  }

  async loadCourses(courseId:string) {
    try {
      this.editMode = true
      const response = await lastValueFrom(this.addCourse.getCourseById(courseId));
      console.log('path value for getting course',response)
      this.createCourse.patchValue({
        title:response.course.title,
        category:response.course.category._id,
        description:response.course.description,
        price:response.course.price,
        thumbnail:response.course.thumbnail
      });
      if (response.course.thumbnail) {
        this.imagePreview = `${environment.AWS_S3_URL}${response.course.thumbnail}`;
        console.log('image url in course',this.imagePreview)
      }
    } catch (error) {
      console.log('Error while fetching the course',error)
    }
  }

  onSelectedFile(event:any) {
    const file = event.target.files[0];
    if(file) {
      this.onChangeImage(file)
    }
  }

  async onChangeImage(file:File) {
    const reader = new FileReader();
    this.editMode = false
    reader.onload = (e) => {
      this.imagePreview = e.target?.result;
    };
    reader.readAsDataURL(file);
    this.selectedImage = file;
      try {
        const {type:fileType,name:fileName} = file;
        const courseId = this.createCourse.value.category;

        const response = await lastValueFrom(
          this.PresignedUrl.getPreSignedUrl(fileName,fileType,courseId)
        );
        await lastValueFrom(
          this.PresignedUrl.uploadToS3(response.preSignedUrl,file)
        )
        this.createCourse.patchValue({thumbnail:response.videoUrl});
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
  }

  updateForm(courseId:string,course:Course) {
    this.addCourse.updateCourse(courseId,course).subscribe({
      next:(response) => {
        console.log(response)
      },
    })
  }



  async submitForm() {
    if (this.createCourse.invalid) {
      return;
    }

    const formData: Course = this.createCourse.value;
    try {
      if(this.courseId) {
        await lastValueFrom(this.addCourse.updateCourse(this.courseId,this.createCourse.value));
        console.log('Course updated successfully!');
      }
      else{
      const response = await lastValueFrom(this.addCourse.uploadCourse(formData));
      console.log('Course uploaded successfully');
      const courseId = response?.course._id; // Adjust this to match your backend response structure
      if (!courseId) {
        console.error('Course ID is undefined. Navigation aborted.');
        return;
      }

      this.route.navigate(['admin-dashboard', 'content-section', courseId]);
      this.closeForm();
    }
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  }

  redirect() {
    this.route.navigate(['admin-dashboard', 'content-section', this.courseId]);
  }
}
