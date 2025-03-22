import { DefaultSession, } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      tokenType?: string;
      accessTokenExpires?: number;
      error?: string;
    } & DefaultSession['user'];
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    accessTokenExpires?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}