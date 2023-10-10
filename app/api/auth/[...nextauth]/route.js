import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        domain: { lable: "domain", type: "string" },
      },
      async authorize(credentials) {
        const { email, password, domain } = credentials;

        const token = btoa(`${email}:${password}`);
        const apiUrl = `https://control-plane-qomhxh6ofa-uc.a.run.app/${domain}/users/get?email=${email}`;
        try {
          const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${token}`,
            },
          });
          const user = await res.json();

          if (!res.ok) {
            console.log("error thrown ");
            throw new Error("This is error message.");
          }
          if (res.ok && user) {
            user.token = token;
            user.domain = domain;
            return user;
          }
          return null;
        } catch (error) {
          throw new Error("error while sign in");
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("Session callback executed", token.user);
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
