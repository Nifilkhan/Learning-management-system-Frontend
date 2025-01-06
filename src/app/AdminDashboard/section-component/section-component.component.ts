import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-section-component',
  templateUrl: './section-component.component.html',
  styleUrl: './section-component.component.scss'
})
export class SectionComponent {

  @Input() sectionGroup!:FormGroup;
  @Input() courseId!:string;
  @Output() save = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() toggleEditMode = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  get lectures(): FormArray<FormGroup> {
    return this.sectionGroup.get('lectures') as FormArray;
  }

  addLecture(): void {
    const lectureGroup = this.createLectureField();
    this.lectures.push(lectureGroup);
  }

  createLectureField(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      contentType: ['', Validators.required],
      videoUrl: [''],
      articleContent:[''],
      description: ['', Validators.required],
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

}
