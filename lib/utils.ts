import { sendTwoFactorTokenEmail, sendVerificationEmail } from './mail';
import { prisma } from './prisma';
import { generateTwoFactorToken, generateVerificationToken } from './tokens';

import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { LoginSchemaProps } from '@/schemas/schemaTypes';
import { User } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const verificationEmail = async (validatedFields: {
  data: LoginSchemaProps;
}) => {
  const verificationToken = await generateVerificationToken(
    validatedFields.data.email
  );

  await sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token
  });
};

export const sendTwoFactorToken = async (existingUser: User) => {
  if (!existingUser.email) return;

  const twoFactorToken = await generateTwoFactorToken(existingUser.email);

  await sendTwoFactorTokenEmail({
    email: twoFactorToken.email,
    token: twoFactorToken.token
  });
};

export const twoFactorCodeMatch = async ({
  email,
  userId,
  code
}: {
  email: string;
  userId: string;
  code?: string;
}) => {
  const twoFactorToken = await getTwoFactorTokenByEmail(email);

  if (!twoFactorToken) return { error: 'Invalid code!' };

  if (twoFactorToken.token !== code) return { error: 'Invalid code!' };

  const hasExpired = new Date(twoFactorToken.expires) < new Date();

  if (hasExpired) return { error: 'Code expires!' };

  await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

  const existingConfirmation = await getTwoFactorConfirmationByUserId(userId);

  if (existingConfirmation)
    await prisma.twoFactorConfirmation.delete({
      where: { id: existingConfirmation.id }
    });

  await prisma.twoFactorConfirmation.create({
    data: {
      userId
    }
  });
};
