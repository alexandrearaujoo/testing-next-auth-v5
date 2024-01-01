import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { getUserByEmail } from './data/user';
import { LoginSchema } from './schemas';

import bcryptjs from 'bcryptjs';

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const user = await getUserByEmail(validatedFields.data.email);

        if (!user || !user.password) return null;

        const passwordMatch = await bcryptjs.compare(
          validatedFields.data.password,
          user.password
        );

        if (!passwordMatch) return null;

        return user;
      }
    })
  ]
} satisfies NextAuthConfig;
