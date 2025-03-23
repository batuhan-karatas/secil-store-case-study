import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {JWT} from 'next-auth/jwt';



// Refresh access token using refresh token
async function refreshAccessToken(token: JWT): Promise<JWT> {

    try {
      const res = await fetch('https://maestro-api-dev.secil.biz/Auth/RefreshTokenLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken
        })
      });
  
      const result = await res.json();
      const newData = result.data;
  
      if (!res.ok || !newData?.accessToken) {
        throw new Error('Failed to refresh access token');
      }

      return {
        ...token,
        accessToken: newData.accessToken,
        refreshToken: newData.refreshToken ?? token.refreshToken,
      };
    } catch (error) {
      console.error('Refresh token error:', error);
      return {
        ...token,
        error: 'RefreshAccessTokenError'
      };
    }
  }


export const authOptions: AuthOptions = {

  secret: process.env.NEXTAUTH_SECRET,

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
                  name: user.name || 'User',
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

        // Initial sign in
        if (user) {
            return {
                ...token,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                tokenType: user.tokenType,
              };
        }

        // Refresh access token
        return refreshAccessToken(token);

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