import { auth } from '@/auth';

export const getCurrentUser = async () => {
  const session = await auth();

  return { currentUser: session?.user };
};

export const getCurrentUserRole = async () => {
  const session = await auth();

  return { currentUserRole: session?.user.role };
};
