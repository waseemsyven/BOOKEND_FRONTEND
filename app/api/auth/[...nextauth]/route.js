import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
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

          if (res.ok) {
            const user = await res.json();

            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("API request error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user }) => {
      return user;
    },
    session: async ({ session }) => {
      return { session };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
