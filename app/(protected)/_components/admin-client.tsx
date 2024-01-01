'use client';

import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { admin } from '@/actions/admin';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

export const AdminClient = ({
  currentUserRole
}: {
  currentUserRole?: UserRole;
}) => {
  const onApiRouteClick = async () => {
    const res = await fetch('/api/admin');

    if (res.ok) {
      toast.success('Allowed API Route!');
      return;
    }

    toast.error('Forbidden API Route!');
  };

  const onServerActionClick = async () => {
    const res = await admin();

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res.success);
  };

  return (
    <Card className="w-[95%] max-w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN} currentRole={currentUserRole}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <article className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </article>
        <article className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </article>
      </CardContent>
    </Card>
  );
};
