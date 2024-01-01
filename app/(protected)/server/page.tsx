import { UserInfo } from '@/components/user-info';

import { getCurrentUser } from '@/lib/auth';

export default async function ServerPage() {
  const { currentUser } = await getCurrentUser();

  return <UserInfo label="💻 Server Component" user={currentUser} />;
}
