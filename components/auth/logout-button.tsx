'use client';

import { ReactNode } from 'react';

import { logout } from '@/actions/logout';

interface LogouButtonProps {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: LogouButtonProps) => {
  const onClick = () => logout();

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
