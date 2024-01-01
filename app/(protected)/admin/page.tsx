import { AdminClient } from '../_components/admin-client';

import { getCurrentUserRole } from '@/lib/auth';

export default async function AdminPage() {
  const { currentUserRole } = await getCurrentUserRole();

  return <AdminClient currentUserRole={currentUserRole} />;
}
