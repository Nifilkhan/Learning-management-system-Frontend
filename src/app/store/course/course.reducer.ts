import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.action';
import { inititalState } from './course.state';

export const courseReducer = createReducer(
  inititalState,

  on(CourseActions.loadCourse,(state,{search,category,limit,offset} ) => ({
    ...state,
    loading:true,
    searchQuery:search  ?? state.searchQuery,
    category: category ?? state.category,
    limit: limit ??state.limit,
    offset:offset ?? state.offset,
    error:null
  })),

  // on(CourseActions.loadSearchCourse,(state,{search}) => ({
  //   ...state,
  //   loading:true,
  //   searchQuery:search,
  //   offset:0,
  //   error:null
  // })),

  // on(CourseActions.loadPaginatedCourse,(state, {limit,offset}) => ({
  //   ...state,
  //   loading:true,
  //   limit,
  //   offset,
  //   error:null
  // })),

  // on(CourseActions.loadCoursesByCategory,(state,{category}) => ({
  //   ...state,
  //   loading:true,
  //   category,
  //   error:null
  // })),


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
