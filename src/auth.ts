import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials) {
        if (
          credentials.email === process.env.OWNER_EMAIL &&
          credentials.password === process.env.OWNER_PASSWORD
        ) {
          return { id: "1", name: "Owner", email: credentials.email as string }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
