import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Course } from '../shared/model/course';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment.development';
import { PaymentService } from '../../services/payment.service';
import { CourseService } from '../../services/course.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourse, loadCourseSuccess } from '../../store/course/course.action';
import { selectAllCourses, selectCourseLoadingState, selectCurrentPage, selectTotalCourses, selectTotalPages } from '../../store/course/course.selector';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
[x: string]: any;

   constructor(private courseService:CourseService, private route:Router, private addCartService:CartService,private routes:ActivatedRoute,private cartService:PaymentService,private store:Store) { }
  //  messsage:boolean = false;
  //  courseData:Course [] = [];
  //  userId!:string;
  //  courseId!:string;
  //  imageUrl:string [] = [];

   courseData$!:Observable<any>
   loadingCourse$!:Observable<boolean>
   totalCourses$!:Observable<number>
   currentPage$!:Observable<number>
   totalPage$!:Observable<number>


   searchQuery: string = '';
   category: string = '';
   length: number = 0;
   pageSize: number = 3;
   pageIndex: number = 0;
   sortBy:string = 'title';
   sortOrder:string = 'asc';
  categorys:Category[] = [];

   ngOnInit(): void {
       this.routes.queryParams.subscribe(params => {
        const searchQuery = params['search']
        // console.log('searcch query',searchQuery)
        const category = params['category']
        // console.log('category params',category)

        if(this.searchQuery !== searchQuery && this.category !== category ) {
          this.searchQuery = searchQuery || '';
          this.category = category || '';
          this.store.dispatch(loadCourse({search:searchQuery,category:this.category}))
        }
       })
       this.getCourse();
       this.getCategory();
   }

   getCategory() {
    this.courseService.getCategory().subscribe({
      next:(data) => {
        this.categorys = data.categories;
      },
    })
   }

   onSortChange(event:Event) {
    console.log('event from onSortChange function',event)
   const target = event.target as HTMLSelectElement
   console.log('target from onSortChange function',target)
   const value = target.value;
   console.log('value from onSortChange function',value)

   if(target.id === 'sortBy') {
     this.sortBy = value;
     console.log('sortby',this.sortBy = value)
   } else if (target.id === 'sortOrder') {
     this.sortOrder = value;
     console.log('sortOrder',this.sortOrder = value)
   }
    this.loadCourse();
   }

   onCategoryChange(event:Event) {
      const target = event.target as HTMLSelectElement;
      console.log('response from target in onCategoryChange',target)
      this.category = target.value === 'all' ? '' : target.value;
      console.log('category response from onCategoryChange',this.category)
      this.loadCourse();
   }


  getCourse() {
    this.courseData$ = this.store.select(selectAllCourses);
    this.loadingCourse$ = this.store.select(selectCourseLoadingState)
    this.totalCourses$ = this.store.select(selectTotalCourses)
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPage$ = this.store.select(selectTotalPages);
    this.totalCourses$.subscribe(total => { this.length = total ,console.log('total courses',total)})

  }

  loadCourse(){
    const offset = this.pageIndex * this.pageSize;
    this.store.dispatch(loadCourse({search:this.searchQuery, limit:this.pageSize, category:this.category, offset,sortBy:this.sortBy, sortOrder:this.sortOrder}));

  }


  onChangeCourse(event:PageEvent) {

    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    // console.log('Updated Pagination Info:', {
    //   length: this.length,
    //   pageSize: this.pageSize,
    //   pageIndex: this.pageIndex
    // });

    this.loadCourse();
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
