import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    role: string;
    email?: string;
    username?: string;
    password?: string;
    name?: string;
    profilePicture?: string;
    referralCode?: string;
  }

  interface Session {
    user: User & {
      role: string;
    };
    sessionToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
