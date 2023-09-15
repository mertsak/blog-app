import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3002/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      session._id = token._id;
      session.token = token.token;
      session.username = token.username;
      session.user = token.user;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id;
        token.token = user.token;
        token.username = user.username;
        token.user = user.user;
      }
      return Promise.resolve(token);
    },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
