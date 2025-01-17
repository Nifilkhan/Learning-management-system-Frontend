import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LectureService } from '../shared/services/lecture.service';
import { CourseService } from '../shared/services/course.service';
import { Lecture } from '../shared/models/lecture';
import { section } from '../shared/models/courseModels';


@Component({
  selector: 'app-section-component',
  templateUrl: './section-component.component.html',
  styleUrl: './section-component.component.scss'
})
export class SectionComponent implements OnInit {

  @Input() sectionGroup!:FormGroup;
  @Input() courseId!:string;
  lecrureId!:string;
  @Output() save = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() toggleEditMode = new EventEmitter<void>();
  lectureData:Lecture [] = [];
  @Input() sectionsValue:section [] = [];

  constructor(private fb:FormBuilder , private courseService:CourseService, private lectureService:LectureService){}

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

  cancel() {
    this.toggleEditMode.emit();
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
    this.lectureService.getLecture(this.lecrureId).subscribe((response) => {
      // this.lectureData.push(response);
      this.lectureData.push(response.lecture);
      console.log(response)
    })
  }

  ngOnInit(): void {
    // this.getSection();
  }


  deleteLecture(index:number) {
    const lectureId = this.lectureData[index]._id;
    if (!lectureId) {
      console.error('Lecture ID is missing');
      return;
    }

    this.lectureService.deleteLecture(lectureId).subscribe((response) => {
      this.lectures.removeAt(index);
      console.log("delete api response",response)
    })
  }


  // getSection() {
  //   this.courseService.getSections(this.courseId).subscribe({
  //     next:(response) =>{
  //       console.log('section response',response)
  //       this.section = response.sections;
  //     },
  //   })
  // }

}
