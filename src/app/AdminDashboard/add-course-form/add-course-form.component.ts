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
import { Category } from '../shared/models/courseModels';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.scss',
})
export class AddCourseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private addCourse: CourseService,
    private route: Router
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
      // coverImage:['',Validators.required],
      // video: this.fb.array([this.createVideoField()]),
      // status:['',Validators.required],
    });

    console.log(this.createCourse.value);
  }

  createVideoField(): FormGroup {
    return this.fb.group({
      video: [null, Validators.required],
    });
  }

  get videos(): FormArray {
    return this.createCourse.get('video') as FormArray;
  }

  removeVideo(index: number): void {
    if (index > 0) {
      this.videos.removeAt(index);
    } else {
      console.log('Cannt be delete the first ine');
    }
  }
  addVideo(): void {
    this.videos.push(
      this.fb.group({
        video: [null, Validators.required],
      })
    );
  }

  onCoverImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      // Updating only the coverImage field
      this.createCourse.patchValue({
        coverImage: file,
      });
    }
  }

  onVideoSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const VideoFile = input.files[0];

      console.log(VideoFile);

      this.videos.at(index).setValue({
        video: VideoFile,
      });
    }
  }

  onSubmit() {
    if (this.createCourse.valid) {
      const courseData = {
        title: this.createCourse.get('title')?.value,
        category: this.createCourse.get('category')?.value,
        description: this.createCourse.get('description')?.value,
        price: this.createCourse.get('price')?.value,
      };
      this.addCourse.uploadCourse(courseData).subscribe({
        next: (response) => {
          console.log('Video added sucessfully', response);
          const courseId = response?.course._id; // Adjust this to match your backend response structure
          if (!courseId) {
            console.error('Course ID is undefined. Navigation aborted.');
            return;
          }

          this.route.navigate(['admin-dashboard', 'content-section', courseId]);
          this.closeForm();
        },
        error(err) {
          console.log('Error occured while adding video', err);
        },
      });
    } else {
    }
  }
}
