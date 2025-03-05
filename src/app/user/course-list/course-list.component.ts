import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course, Lecture, section } from '../shared/model/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {

  courseDataList!:Course;
  @Input() sectionData:section[] = [];
  @Output() lectureSelected = new EventEmitter<Lecture>();
  @Output() toggleContent = new EventEmitter<void>();
  isVisible:boolean = false;

  constructor(private route:ActivatedRoute) { }

isContentVisible(){
  console.log('second')
  this.isVisible = !this.isVisible;
  this.toggleContent.emit();
}

  toggleExpandSection(section:section) {
    section.expand = !section.expand;
  }

  selectedLecture(lecture:Lecture) {
    this.lectureSelected.emit(lecture);
    console.log('lectureUrl:',lecture);
  }
}
