import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.action';
import { inititalState } from './course.state';

export const courseReducer = createReducer(
  inititalState,

  on(CourseActions.loadCourse,(state,{search,category,limit,offset,sortBy,sortOrder} ) => ({
    ...state,
    loading:true,
    searchQuery:search  ?? state.searchQuery,
    category: category ?? state.category,
    limit: limit ??state.limit,
    offset:offset ?? state.offset,
    sortBy:sortBy ?? state.sortBy,
    sortOrder: sortOrder ?? state.sortOrder,
    error:null
  })),


  on(CourseActions.loadCourseSuccess, (state, { courses, totalPages,totalCourses,currentPage }) => ({
    ...state,
    courses,
    totalCourses,
    totalPages,
    currentPage,
    loading: false,
    error:null
  })),

  on(CourseActions.loadCourseFailure,(state,{error}) => ({
    ...state,
    error,
    loading:false
  }))
)
