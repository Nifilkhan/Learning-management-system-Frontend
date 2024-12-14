import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { section } from '../shared/models/courseModels';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {
title!: string;
courseId!: string;

  constructor(private fb:FormBuilder,private http:CourseService , private route:ActivatedRoute){}

  videoForm!:FormGroup;
  sectionAdd:section [] = [];

  ngOnInit() {
    this.createSection();
    this.fetchCourseId();
  }

  createSection() {
    this.videoForm = this.fb.group({
      section:this.fb.array([this.createSectionField()]),
    })
  }

  createSectionField():FormGroup {
    return this.fb.group({
      title:['',Validators.required]
    })
  }

  get section():FormArray {
    return this.videoForm.get('section') as FormArray;
  }

  removeIndex(index:number) {
      this.section.removeAt(index);
  }
  addSection():void {
    this.section.push(this.createSectionField())
  }

    // Fetch courseId from the route parameters
    fetchCourseId(): void {
      this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
      if (!this.courseId) {
        console.error('Course ID is missing from route parameters.');
        return;
      }
    }

  onsubmit(index:number) {
    // console.log(title,courseId);
    const sectionGroup = this.section.at(index) as FormGroup
    const title = sectionGroup.get('title')?.value;

    console.log('Title:', title); // Debugging log for title
    console.log('Course ID:', this.courseId); // Debugging log for courseId

    if (!this.courseId) {
      console.error('Course ID is undefined. Navigation aborted.');
      return;
    }


    this.http.addSection(title,this.courseId).subscribe({
      next:(response) => {
        this.sectionAdd = response;
      },
      error(err) {
          console.log(err)
      },
    })
  }

}
