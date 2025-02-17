import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../shared/model/course';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment.development';
import { PaymentService } from '../../services/payment.service';
import { CourseService } from '../../services/course.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourse, loadCourseSuccess } from '../../store/course/course.action';
import { selectAllCourses, selectCourseLoadingState } from '../../store/course/course.selector';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

   constructor(private courseService:CourseService, private route:Router, private addCartService:CartService,private routes:ActivatedRoute,private cartService:PaymentService,private store:Store) { }
   messsage:boolean = false;
   courseData:Course [] = [];
   userId!:string;
   courseId!:string;
   imageUrl:string [] = [];

   courseData$!:Observable<Course[]>
   loadingCourse$!:Observable<boolean>
   totalCourses$!:Observable<number>
   currentPage$!:Observable<number>
   totalPage$!:Observable<number>


   searchQuery: string = '';
   category: string = '';
   limit: number = 10;
   offset: number = 0;


   ngOnInit(): void {
       this.routes.queryParams.subscribe(params => {
        const searchQuery = params['search']
        console.log('searcch query',searchQuery)
        const category = params['category']
        console.log('category params',category)

        if(this.searchQuery !== searchQuery && this.category !== category ) {
          this.searchQuery = searchQuery || ''; 
          this.category = category || '';
          this.store.dispatch(loadCourse({search:searchQuery,category:this.category}))
        }
       })
       this.getCourse();
   }



  getCourse() {
    this.loadCourse()
    this.courseData$ = this.store.select(selectAllCourses);
    this.loadingCourse$ = this.store.select(selectCourseLoadingState)
  }

  loadCourse() {
    this.store.dispatch(loadCourse({search:this.searchQuery, limit:this.limit, category:this.category, offset:this.offset}));
  }

  onClick(courseId:string) {
    this.route.navigate(['home/courseDetail',courseId])
  }


  addToCart(courseId:string){
    this.addCartService.addCart(courseId).subscribe({
      next:(response) => {
        console.log(response)
        console.log('Add to cart:',response);
      }
    })
  }

  buyCourse(courseId:string) {
    console.log('buyying course id',courseId)
    this.cartService.createCheckoutSession({courseId}).subscribe({
      next:(response) => {
          this.cartService.reditrectToCheckout(response.sessionId)
      },error:(err) => {
        console.log('error occured while payment',err)
      },
    })
  }
}
