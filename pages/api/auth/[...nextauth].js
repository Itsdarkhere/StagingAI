import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://realtool.io';

// Js since Idk about the types for this
export const authOptions = {
  session: {
    // strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const reqData = {
          email: credentials.email,
          password: credentials.password,
        };

        const user = await fetch(`${server}/api/auth/login123`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqData),
        }).then((res) => res.json());

        console.log('user: ', user);

        if (user.is_success) {
          console.log('nextauth daki user: ' + user.is_success);
          return user;
        } else {
          console.log('check your credentials');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // token.user_type = user.data.auth.userType;
        // token.accessToken = user.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        // session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
