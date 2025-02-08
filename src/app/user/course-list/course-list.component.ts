import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course, section } from '../shared/model/course';
import { CoursesService } from '../shared/services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {

  courseDataList!:Course;
  @Input() sectionData:section[] = [];
  @Output() lectureSelected = new EventEmitter<string>();


  constructor(private courseService:CoursesService,private route:ActivatedRoute) { }

  ngOnInit(): void {

  }


  toggleExpandSection(section:section) {
    section.expand = !section.expand;
  }

  selectedLecture(lectureUrl:string) {
    this.lectureSelected.emit(lectureUrl);
    console.log('lectureUrl:',lectureUrl);
  }
}
