import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        domain: { lable: "domain", type: "string" },
      },
      async authorize(credentials, req) {
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
            throw new Error(user.message);
          }
          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("API request error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async (user) => {
      return user;
    },
    session: async (user) => {
      return user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
