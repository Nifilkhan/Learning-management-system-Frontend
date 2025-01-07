import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LectureService } from '../shared/services/lecture.service';
import { CourseService } from '../shared/services/course.service';


@Component({
  selector: 'app-section-component',
  templateUrl: './section-component.component.html',
  styleUrl: './section-component.component.scss'
})
export class SectionComponent implements OnInit {

  @Input() sectionGroup!:FormGroup;
  @Input() courseId!:string;
  @Output() save = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() toggleEditMode = new EventEmitter<void>();

  constructor(private fb:FormBuilder , private courseService:CourseService){}

  get lectures(): FormArray<FormGroup> {
    return this.sectionGroup.get('lectures') as FormArray;
  }

  addLecture(): void {
    const lectureGroup = this.createLectureField();
    this.lectures.push(lectureGroup);
  }

  createLectureField(lectureId:string =''): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      contentType: ['', Validators.required],
      videoUrl: [''],
      articleContent:[''],
      description: ['', Validators.required],
      showAddLecture:[true],
      id:[lectureId]

    })
  }

  removeLecture(index: number): void {
    this.lectures.removeAt(index);
  }

  saveSection(){
    this.save.emit();
  }

  removeSection() {
    this.remove.emit();
  }

  toggleEdit() {
    this.toggleEditMode.emit();
  }

  getLecture() {
    this.courseService.getLecture('lectureId').subscribe((lecture) => {
      console.log(lecture);
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getLecture();
  }


}
