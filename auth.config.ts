import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmail } from './data/user';
import { LoginSchema } from './schemas';

import bcryptjs from 'bcryptjs';

export default {
  providers: [
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
