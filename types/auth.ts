export interface SignUpFormValues {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    referralCode: string;
  }
  
  export interface SignUpResponse {
    success: boolean;
    message: string;
  }
  
  export interface SignInFormValues {
    username: string;
    password: string;
  }
  
  export interface SignInResponse {
    success: boolean;
    message: string;
  }
  