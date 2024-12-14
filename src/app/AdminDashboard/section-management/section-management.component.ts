import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { section } from '../shared/models/courseModels';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {
title!: string;
courseId!: string;

  constructor(private fb:FormBuilder,private http:CourseService){}

  videoForm!:FormGroup;
  sectionAdd:section [] = [];

  ngOnInit() {
    this.createSection()
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

  onsubmit(title:string,courseId:string) {
    this.http.addSection(title,courseId).subscribe({
      next:(response) => {
        this.sectionAdd = response;
      },
      error(err) {
          console.log(err)
      },
    })
  }

}
