import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        const user = {
          email: credentials.email,
          password: credentials.password,
          is_success: true,
        };

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
        console.log('User: ', user);
        token.email = user.email;
        // token.user_type = user.data.auth.userType;
        // token.accessToken = user.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        // session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
