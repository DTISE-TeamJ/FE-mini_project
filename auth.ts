import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { SignInResponse } from "./types/auth";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
interface UserAuthResponse extends User {
  jwt: string;
}

interface CustomJWT extends JWT {
  jwt: string;
}

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

          const { user, jwt } = result.data;
          const cookieStore = cookies();
          console.log(cookieStore.get("jwt"));
          cookieStore.set("jwt", jwt);
          return {
            ...user,
            jwt,
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
      const u = user as UserAuthResponse | undefined;
      if (u) {
        token.username = u.username;
        token.role = u.role;
        token.id = u.id;
        token.jwt = u.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      if (session.user) {
        session.user.username = token.username as string;
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.sessionToken = customToken.jwt;
      }
      return session;
    },
    async signIn({ user }) {
      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "session-jwt",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
