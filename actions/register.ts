'use server';

import { getUserByEmail } from '@/data/user';
import { prisma } from '@/lib/prisma';
import { RegisterSchema } from '@/schemas';
import { RegisterSchemaProps } from '@/schemas/schemaTypes';
import bcryptjs from 'bcryptjs';

export const register = async (data: RegisterSchemaProps) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const existingUser = await getUserByEmail(validatedFields.data.email);

  if (existingUser) return { error: 'Email already in use!' };

  const hashedPassword = await bcryptjs.hash(validatedFields.data.password, 10);

  await prisma.user.create({
    data: {
      ...validatedFields.data,
      password: hashedPassword
    }
  });

  return { success: 'User created!' };
};
