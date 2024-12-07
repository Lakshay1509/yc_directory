import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const { handlers, auth,signIn,signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
})