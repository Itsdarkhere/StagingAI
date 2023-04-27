import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const backendURL = 'localhost:3000';

// Js since Idk about the types for this
export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };

        // const resp = await fetch(backendURL + '/auth/login', {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(credentialDetails),
        // });

        // const user = await resp.json();
        const user = {
          email: 'emo@il.com',
          password: 'passsword',
          is_success: true,
        }

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
        console.log("User: ", user);
        token.email = user.email;
        // token.user_type = user.data.auth.userType;
        // token.accessToken = user.data.auth.token;
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
