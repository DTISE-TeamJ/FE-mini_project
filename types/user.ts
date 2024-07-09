export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: string;
  profilePicture: string;
  referralCode: string;
  jwt: string;
}

export interface JWT {
  jwt: string;
}
