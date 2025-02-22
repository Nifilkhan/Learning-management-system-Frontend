import { Course } from '../../user/shared/model/course';

export interface CourseState {

  courses:Course[],
  loading:boolean,
  error:string | null;
  totalCourses:number,
  totalPages:number,
  currentPage:number,
  searchQuery:string,
  category:string,
  limit:number,
  offset:number
  sortBy:string,
  sortOrder:string
}

export const inititalState:CourseState = {
  courses:[],
  loading:false,
  error:null,
  totalCourses:0,
  totalPages:0,
  currentPage:0,
  searchQuery:'',
  category:'',
  limit:10,
  offset:0,
  sortBy:'',
  sortOrder:''
}
