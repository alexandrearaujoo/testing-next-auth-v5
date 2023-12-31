'use server';

import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';

export const login = async (data: LoginSchemaProps) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  return { success: 'Email sent' };
};
