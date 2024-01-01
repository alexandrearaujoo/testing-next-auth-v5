'use server';

import { getCurrentUserRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const { currentUserRole } = await getCurrentUserRole();

  if (currentUserRole !== UserRole.ADMIN)
    return { error: 'Forbidden Server Action!' };

  return { success: 'Allowed Server Action!' };
};
