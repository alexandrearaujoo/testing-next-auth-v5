'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';

interface ErrorType {
  [key: string]: boolean;
}

const errorType: ErrorType = {
  CredentialsSignin: true
};

export const login = async (data: LoginSchemaProps) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  try {
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (errorType[error.type]) return { error: 'Invalid Credentials!' };
      return { error: 'Something went wrong!' };
    }

    throw error;
  }
};
