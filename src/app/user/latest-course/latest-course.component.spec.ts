import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCourseComponent } from './latest-course.component';

describe('LatestCourseComponent', () => {
  let component: LatestCourseComponent;
  let fixture: ComponentFixture<LatestCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
