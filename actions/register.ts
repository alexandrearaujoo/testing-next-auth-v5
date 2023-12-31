'use server';

import { RegisterSchema } from '@/schemas';
import { RegisterSchemaProps } from '@/schemas/schemaTypes';

export const register = async (data: RegisterSchemaProps) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  return { success: 'Email sent' };
};
