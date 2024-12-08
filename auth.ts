import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { write_client } from "./sanity/lib/write"

export const { handlers, auth,signIn,signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks:{
    async signIn({user,account,profile,email}){
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY,{
      id:profile?.id});

      if(!existingUser){
        await write_client.create({
          _type :'author',
          id:profile?.id,
          name: user?.name,
          username:profile?.login,
          email:user?.email,
          image: user?.image,
          bio : profile?.bio||'',
        })
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  }
})