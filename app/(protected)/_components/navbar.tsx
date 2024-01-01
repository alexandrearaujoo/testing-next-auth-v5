'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserButton } from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full max-w-[600px]">
      <ul className="flex gap-2">
        <li>
          <Button
            asChild
            variant={pathname === '/server' ? 'default' : 'outline'}
          >
            <Link href="/server">Server</Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={pathname === '/client' ? 'default' : 'outline'}
          >
            <Link href="/client">Client Component</Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={pathname === '/admin' ? 'default' : 'outline'}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={pathname === '/settings' ? 'default' : 'outline'}
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </li>
      </ul>
      <UserButton />
    </nav>
  );
};
