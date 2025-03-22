import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';




export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
            const res = await fetch('https://maestro-api-dev.secil.biz/Auth/Login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        username: credentials?.email,
                        password: credentials?.password
                    }
                ),
            });
            const result = await res.json();
            const user = result.data;

            if (res.ok && user?.accessToken) {
                return {
                  id: 'user_id',
                  email: credentials?.email,
                  name: user.name || 'Frontend User',
                  accessToken: user.accessToken,
                  refreshToken: user.refreshToken,
                  tokenType: user.tokenType
                };
              }
            return null;

        } catch (error) {
            console.error('Login error:', error);
            return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.tokenType = user.tokenType;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.tokenType = token.tokenType;
        return session;
      }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  }
};