import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/shared/lib/db";
import { getGoogleOAuthCredentials } from "@/shared/lib/env";

const googleOAuth = getGoogleOAuthCredentials();

function resolveAuthSecret(): string | undefined {
  const secret =
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim();
  if (!secret || secret === "runtime-placeholder-change-me") return undefined;
  return secret;
}

const authSecret = resolveAuthSecret();

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
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
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
