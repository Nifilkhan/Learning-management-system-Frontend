import { createAction, props } from '@ngrx/store';
import { Course } from '../../user/shared/model/course';

export const loadCourse = createAction(
  '[Courses] Load Courses',
  props<{search?:string; category?:string; limit?:number; offset?:number; sortBy?:string; sortOrder?:string}>()
)


export const loadCourseSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{courses:Course[],totalCourses:number; currentPage:number; totalPages:number}>()
)

export const loadCourseFailure = createAction(
  '[Courses] Load Course Failure',
  props<{ error: string }>()
)
