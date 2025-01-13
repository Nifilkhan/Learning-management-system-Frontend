export interface Category {
  name: string;
  _id: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: Category; // Assuming this is an ID (e.g., ObjectId as a string)
  price: number | string; // Price can be a number or string
  status: 'draft' | 'published'; // Status options
  section: string[]; // Array of Section IDs (MongoDB ObjectId as strings)
}


export interface section {
  _id?:string,
  title: string;
  lecture: Lecture[];
}

export interface Lecture {
  _id?:string;
  title: string;
  description: string;
  contentType:string;
  videoUrl?:string;
  articleContent?:string;
}
