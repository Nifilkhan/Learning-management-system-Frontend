import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Course, Lecture, section } from '../shared/model/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {

  courseDataList!:Course;
  @Input() sectionData:section[] = [];
  @Output() lectureSelected = new EventEmitter<Lecture>();
  @Output() toggleContent = new EventEmitter<void>();
  isVisible:boolean = false;
  isLoading:boolean = true;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
      setTimeout(() => {
        this.isLoading = false
      }, 2000);
  }

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
