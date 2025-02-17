import { inject, Injectable } from "@angular/core";
import * as CourseActions from './course.action'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../../services/course.service";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { environment } from "../../../environments/environment.development";


@Injectable()
export class CourseEffects {

  private actions$ = inject(Actions)
  constructor(private courseService:CourseService){
    console.log('actions$',this.actions$)
  }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourse),
      mergeMap(({search,category,limit,offset}) =>
        this.courseService.getCourses(search,category,limit,offset).pipe(
          map((response) =>{
            const imageUrlResponse = response.courses.map(course => ({
              ...course,
              thumbnail:`${environment.AWS_S3_URL}${course.thumbnail}`,
            }));
            return CourseActions.loadCourseSuccess({
              courses: imageUrlResponse,
              totalCourses: response.totalCourses,
              currentPage: response.currentPage,
              totalPages: response.totalPages
            })
            }),
            tap((response) => {
              console.log(response.courses)
            }),
          catchError((error) => of(CourseActions.loadCourseFailure({error:error.message})))

        )
      )
    )
  )
}
