export interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  referralCode: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
