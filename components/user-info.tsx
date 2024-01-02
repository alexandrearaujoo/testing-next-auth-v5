import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';

import { ExtendedUser } from '@/next-auth';

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-[95%] max-w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
          <li className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">ID</p>
            <p
              className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
              title={user?.id}
            >
              {user?.id}
            </p>
          </li>
          <li className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">Name</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {user?.name}
            </p>
          </li>
          <li className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">Email</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {user?.email}
            </p>
          </li>
          <li className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">Role</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {user?.role}
            </p>
          </li>
          <li className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">Two Factor Authentication</p>
            <Badge
              variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
            >
              {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
            </Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
