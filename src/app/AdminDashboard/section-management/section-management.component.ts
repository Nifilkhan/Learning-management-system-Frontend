import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { section } from '../shared/models/courseModels';
import { response } from 'express';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {
  title!: string;
  courseId!: string;

  constructor(private fb: FormBuilder, private http: CourseService, private route: ActivatedRoute) {}

  videoForm!: FormGroup;
  sectionAdd: section[] = [];

  ngOnInit() {
    this.createSection();
    this.fetchCourseId();
    this.getSection();
  }

  createSection() {
    this.videoForm = this.fb.group({
      section: this.fb.array([]),
    });
  }

  createSectionField(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isEditable: [true],  // Sections start in editable mode when added
    });
  }

  get section(): FormArray {
    return this.videoForm.get('section') as FormArray;
  }

  removeIndex(index: number) {
    this.section.removeAt(index);
  }

  addSection(): void {
    this.section.push(this.createSectionField());
  }

  fetchCourseId(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    if (!this.courseId) {
      console.error('Course ID is missing from route parameters.');
      return;
    }
  }

  onsubmit(index: number) {
    const sectionGroup = this.section.at(index) as FormGroup;
    const title = sectionGroup.get('title')?.value;

    if (!this.courseId) {
      console.error('Course ID is undefined. Navigation aborted.');
      return;
    }

    this.http.addSection(title, this.courseId).subscribe({
      next: (response) => {
        console.log(response, 'section');
        this.sectionAdd = response;
        // Set the section to non-editable after adding
        sectionGroup.get('isEditable')?.setValue(false);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  toggleSectionTitle(index: number) {
    const sectionGroup = this.section.at(index) as FormGroup;
    sectionGroup.get('isEditable')?.setValue(!sectionGroup.get('isEditable')?.value);
  }

  getSection() {
    this.http.getSection(this.courseId).subscribe({
      next:(response:any) => {
         response;
        console.log("section response",response);

      }
    })
  }
}
