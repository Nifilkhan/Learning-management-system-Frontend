import { createAction, props } from '@ngrx/store';
import { Course } from '../../user/shared/model/course';

export const loadCourse = createAction(
  '[Courses] Load Courses',
  props<{search?:string; category?:string; limit?:number; offset?:number}>()
)


export const loadCourseSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{courses:Course[],totalCourses:number; currentPage:number; totalPages:number}>()
)

// export const loadSearchCourse = createAction(
//   '[Courses] Search Courses',
//   props<{search:string}>()
// )

// export const loadPaginatedCourse = createAction(
//   '[Courses] Load Paginated Courses',
//   props<{limit:number, offset:number}>()
// )

// // **Load Courses by Category**
// export const loadCoursesByCategory = createAction(
//   '[Course] Load Courses By Category',
//   props<{ category: string }>()
// );

export const loadCourseFailure = createAction(
  '[Courses] Load Course Failure',
  props<{ error: string }>()
)
