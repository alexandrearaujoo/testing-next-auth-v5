'use server';

import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetPasswordSchema } from '@/schemas';
import { ResetPasswordProps } from '@/schemas/schemaTypes';

export const resetPassword = async (data: ResetPasswordProps) => {
  const validatedFields = ResetPasswordSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid email!' };

  const existingUser = await getUserByEmail(validatedFields.data.email);

  if (!existingUser) return { error: 'Email not found!' };

  const passwordResetToken = await generatePasswordResetToken(
    validatedFields.data.email
  );

  await sendPasswordResetEmail({
    email: passwordResetToken.email,
    token: passwordResetToken.token
  });

  return { success: 'Reset email sent!' };
};
