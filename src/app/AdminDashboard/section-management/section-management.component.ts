import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { response } from 'express';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {
  courseId!: string;
  videoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchCourseId();
    this.fetchSections();
  }

  initializeForm() {
    this.videoForm = this.fb.group({
      section: this.fb.array([])
    });
  }

  get sections(): FormArray {
    return this.videoForm.get('section') as FormArray;
  }

  createSectionField(title: string = '', isEditable: boolean = true,id:string = ''): FormGroup {
    return this.fb.group({
      title: [title, Validators.required],
      isEditable: [isEditable],
      id:[id]
    });
  }

  addSection(): void {
    this.sections.push(this.createSectionField());
  }

  removeSection(index: number): void {
    const sectionId = this.sections.at(index).get('id')?.value;
    if(sectionId) {
      this.courseService.deleteSection(this.courseId,sectionId).subscribe({
        next:(response) => {
          this.sections.removeAt(index);
          console.log('Section deleted:',response);
        },
        error:(err) => console.error('Error deleting section:',err)
      })
    } else {
      this.sections.removeAt(index);
    }
  }

  fetchCourseId(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    if (!this.courseId) {
      console.error('Course ID is missing from route parameters.');
    }
  }

  fetchSections(): void {
    if (!this.courseId) return;

    this.courseService.getSections(this.courseId).subscribe({
      next: (response) => {

        const sections = response.sections;
        if(!sections || !sections.length) {
          console.log('No sections found for this course.');
          return;
        }
        this.sections.clear();
        response.sections.forEach(({ title, id }: { title: string, id: string }) => {
          const sectionGroup = this.createSectionField(title, false,id);
          // sectionGroup.addControl('id', this.fb.control(section._id));
          this.sections.push(sectionGroup);
        });
      },
      error: (err) => console.error('Error fetching sections:', err)
    });
  }

  saveSection(index: number): void {
    const sectionGroup = this.sections.at(index) as FormGroup;
    const title = sectionGroup.get('title')?.value;

    if (!this.courseId || !title) return;

    this.courseService.addSection(title, this.courseId).subscribe({
      next: (response) => {
        sectionGroup.get('isEditable')?.setValue(false);
      },
      error: (err) => console.error('Error saving section:', err)
    });
  }

  toggleEditMode(index: number): void {
    const sectionGroup = this.sections.at(index) as FormGroup;
    const currentMode = sectionGroup.get('isEditable')?.value;
    sectionGroup.get('isEditable')?.setValue(!currentMode);
  }
}
