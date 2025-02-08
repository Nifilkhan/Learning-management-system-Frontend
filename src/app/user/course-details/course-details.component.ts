import { expand, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../shared/services/course.service';

import { Course, section } from '../shared/model/course';
import { CourseService } from '../../AdminDashboard/shared/services/course.service';
import { LectureService } from '../../AdminDashboard/shared/services/lecture.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  courseId!: string;
  courses!: Course;
  sectionData: section[] = [];
  selectVideoUrl:string = ''

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private sectionService: CourseService,
    private lectureService: LectureService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId')!;
    });
    if (this.courseId) {
      this.getCourseDetails();
    } else {
      console.log('courseId is not available');
    }
  }

  getCourseDetails() {
    this.courseService.getCourse(this.courseId).subscribe({
      next: (response) => {
        this.courses = response.course;
        this.getSection();
        // console.log(response)
      },
    });
  }
  getSection() {
    this.sectionService.getSections(this.courseId).subscribe((response) => {
      this.sectionData = response.sections.map((section: section) => ({
        ...section,
        expand:false,
      }));

      this.sectionData.forEach((section) => {
        this.lectureService
          .getLectures(section._id!)
          .subscribe((lectureResponse) => {
            console.log('lecture response from', lectureResponse);
            section.lecture = lectureResponse.lectures.map((lecture) => ({
              ...lecture,
              videoUrl: lecture.videoUrl
                ? `${environment.AWS_S3_URL}${lecture.videoUrl}`
                : null,
            }));
            // console.log(section.lecture.map(lecture => lecture.videoUrl));
          });
      });
    });
  }

  selectLecture(videoUrl:string) {
    this.selectVideoUrl = videoUrl;
  }
}
