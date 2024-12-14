export interface ApiResponse<C>{
  message?:string;
  categories:C[];
}

export interface Category{
  name:string;
  _id:string;
}
