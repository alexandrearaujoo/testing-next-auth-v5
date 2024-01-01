'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';
import { sendVerificationEmail } from '@/lib/mail';

interface ErrorType {
  [key: string]: string;
}

const errorType: ErrorType = {
  CredentialsSignin: 'Invalid Credentials!',
  AuthorizedCallbackError: 'Email not verified!'
};

export const login = async (data: LoginSchemaProps) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const existingUser = await getUserByEmail(validatedFields.data.email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: 'Email does not exists!' };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      validatedFields.data.email
    );

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token
    });

    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (errorType[error.type]) return { error: errorType[error.type] };
      return { error: 'Something went wrong!' };
    }

    throw error;
  }
};
