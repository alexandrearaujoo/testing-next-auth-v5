'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingSchemaProps } from '@/schemas/schemaTypes';
import bcryptjs from 'bcryptjs';

export const settings = async (data: SettingSchemaProps) => {
  const { currentUser } = await getCurrentUser();

  if (!currentUser) return { error: 'Unauthorized!' };

  const dbUser = await getUserById(currentUser.id);

  if (!dbUser) return { error: 'Unauthorized!' };

  if (currentUser.isOAuth) {
    data.email = undefined;
    data.password = undefined;
    data.newPassword = undefined;
    data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== currentUser.email) {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser && existingUser.id !== currentUser.id)
      return { error: 'Email already in use!' };

    const verificationToken = await generateVerificationToken(data.email);

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token
    });

    return { success: 'Verification email sent!' };
  }

  if (data.password && data.newPassword && dbUser.password) {
    const passwordMatch = bcryptjs.compare(data.password, dbUser.password);

    if (!passwordMatch) return { error: 'Incorrect password!' };

    data.password = await bcryptjs.hash(data.newPassword, 10);
    data.newPassword = undefined;
  }

  await prisma.user.update({ where: { id: dbUser.id }, data: { ...data } });

  return { success: 'Settings Updated!' };
};
