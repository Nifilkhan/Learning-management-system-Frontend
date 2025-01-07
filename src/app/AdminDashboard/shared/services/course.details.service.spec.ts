/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CoursedetailsService } from './course.details.service';

describe('Service: Course.details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursedetailsService]
    });
  });

  it('should ...', inject([CoursedetailsService], (service: CoursedetailsService) => {
    expect(service).toBeTruthy();
  }));
});
