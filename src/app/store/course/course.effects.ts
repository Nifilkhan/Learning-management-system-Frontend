import { inject, Injectable } from "@angular/core";
import * as CourseActions from './course.action'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../../services/course.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { environment } from "../../../environments/environment.development";
import { Course } from "../../user/shared/model/course";


@Injectable()
export class CourseEffects {

  private actions$ = inject(Actions)
  constructor(private courseService:CourseService){
    console.log('actions$',this.actions$)
  }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourse),
      tap(action => console.log('action dispatched',action)),
      switchMap(({search,category,limit,offset,sortBy,sortOrder}) =>
        this.courseService.getCourses(search,category,limit,offset,sortBy,sortOrder).pipe(
          map((response) =>{
            const imageUrlResponse = response.courses.map(course => ({
              ...course,
              thumbnail:`${environment.AWS_S3_URL}${course.thumbnail}`,
            }));
            const puchasedCourse:Course[] = imageUrlResponse.filter(course => course.isPurchased)
            const unPurchased:Course[] = imageUrlResponse.filter(course => !course.isPurchased)

            return CourseActions.loadCourseSuccess({
              courses: unPurchased,
              puchasedCourse,
              totalCourses: response.totalCourses,
              currentPage: response.currentPage,
              totalPages: response.totalPages
            })
            }),
            tap((response) => {
              console.log('backend response',response)
            }),
          catchError((error) => of(CourseActions.loadCourseFailure({error:error.message})))

        )
      )
    )
  )
}
