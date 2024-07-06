import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { SignInResponse } from "./types/auth";

/*
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const result = await res.json();
          const { user } = result.data;

          console.log(res, "<== res");

          if (!res.ok) {
            const errorData: SignInResponse = await res.json();
            console.log(errorData, "<== error data");
            throw new Error(errorData.message || "Authentication failed");
          }

          return {
            id: user.id,
            email: user.email,
            role: user.authorities[0].authority,
          };
        } catch (error) {
          throw new Error("something went wrong !");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn(params) {
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "jwt",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
*/

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const result: SignInResponse = await res.json();

          if (!res.ok) {
            const error = new Error(result.message || "Authentication failed");
            throw error;
          }

          const { user } = result.data;

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.authorities[0].authority,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn(params) {
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "jwt",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
