import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/shared/lib/db";
import { getGoogleOAuthCredentials } from "@/shared/lib/env";

const googleOAuth = getGoogleOAuthCredentials();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  providers: [
    ...(googleOAuth
      ? [
          Google({
            clientId: googleOAuth.clientId,
            clientSecret: googleOAuth.clientSecret,
          }),
        ]
      : []),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
