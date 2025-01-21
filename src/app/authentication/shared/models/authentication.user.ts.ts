export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?:string
}

export interface Otp {
  verificationCode:Number
}


export interface Login {
  email:string;
  password:string;
}

export interface LoginResponse {
  role:string;
  message:string;
  token?:string
}
