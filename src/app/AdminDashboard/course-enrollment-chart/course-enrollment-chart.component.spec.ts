import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollmentChartComponent } from './course-enrollment-chart.component';

describe('CourseEnrollmentChartComponent', () => {
  let component: CourseEnrollmentChartComponent;
  let fixture: ComponentFixture<CourseEnrollmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseEnrollmentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEnrollmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
