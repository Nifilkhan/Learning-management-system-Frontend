export interface Lecture {
  _id?:string;
  title: string;
  description: string;
  contentType:string;
  videoUrl?:string;
  articleContent?:string;
}

export interface PresignedUrl {
  preSignedUrl: string;
  videoUrl: string;
}
