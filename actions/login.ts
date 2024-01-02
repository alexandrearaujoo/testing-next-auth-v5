'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import {
  sendTwoFactorToken,
  twoFactorCodeMatch,
  verificationEmail
} from '@/lib/utils';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';

interface ErrorType {
  [key: string]: string;
}

const errorType: ErrorType = {
  CredentialsSignin: 'Invalid Credentials!',
  AuthorizedCallbackError: 'Email not verified!'
};

export const login = async (
  data: LoginSchemaProps,
  callbackUrl: string | null
) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const existingUser = await getUserByEmail(validatedFields.data.email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: 'Email does not exists!' };

  if (!existingUser.emailVerified) {
    await verificationEmail(validatedFields);
    return { success: 'Confirmation email sent!' };
  }

  if (
    existingUser.isTwoFactorEnabled &&
    existingUser.email &&
    !validatedFields.data.code
  ) {
    await sendTwoFactorToken(existingUser);
    return { twoFactor: true };
  }

  if (
    existingUser.isTwoFactorEnabled &&
    existingUser.email &&
    validatedFields.data.code
  ) {
    await twoFactorCodeMatch({
      email: existingUser.email,
      userId: existingUser.email,
      code: validatedFields.data.code
    });
  }

  try {
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (errorType[error.type]) return { error: errorType[error.type] };
      return { error: 'Something went wrong!' };
    }

    throw error;
  }
};
