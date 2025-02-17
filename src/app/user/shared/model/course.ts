export interface Category {
  name: string;
  _id: string;
}

export interface Course {
createdAt?: string|number|Date;
  _id?: string;
  title: string;
  description: string;
  category: Category;
  price: number | string;
  status: 'draft' | 'published';
  section: string[];
  thumbnail:string;
}


export interface section {
  _id?:string,
  title: string;
  lecture: Lecture[];
  expand?:boolean;
  locked?: boolean;
}

export interface Lecture {
  _id?:string;
  title: string;
  description: string;
  contentType:string;
  videoUrl?:string | null;
  articleContent?:string;
  locked?: boolean;
}
