'use client';

import { ReactNode } from 'react';

import { FormError } from '../form-error';

import { UserRole } from '@prisma/client';

interface RoleGateProps {
  children: ReactNode;
  allowedRole: UserRole;
  currentRole?: UserRole;
}

export const RoleGate = ({
  allowedRole,
  children,
  currentRole
}: RoleGateProps) => {
  if (currentRole !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
