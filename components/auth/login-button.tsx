'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface LoginButtonProps {
  children: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  asChild,
  mode = 'redirect'
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') return <span>oi</span>;

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
