import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { CourseState } from "./course.state";


export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state) => state.courses
)

export const selectCourseLoadingState = createSelector(
  selectCourseState,
  (state) => state.loading
)

export const selectCourseErrorState = createSelector(
  selectCourseState,
  (state) => state.error
)

export const selectTotalCourses = createSelector(
  selectCourseState,
  (state) => state.totalCourses
)

export const selectCurrentPage = createSelector(
  selectCourseState,
  (state) => state.currentPage
)

export const selectTotalPages = createSelector(
  selectCourseState,
  (state) => state.totalPages
)


export const selectSearchQuery = createSelector(
  selectCourseState,
  (state) => state.searchQuery
)

export const selectCategory = createSelector(
  selectCourseState,
  (state) => state.category
)

export const selectSortBy = createSelector(
  selectCourseState,
  (state) => state.sortBy
)

export const selectSortOrder = createSelector(
  selectCourseState,
  (state) => state.sortOrder
)
