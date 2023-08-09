import Okta from "next-auth/providers/okta";

import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    Okta({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET,
      issuer: process.env.OKTA_OAUTH2_ISSUER,
    }),
  ],
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
