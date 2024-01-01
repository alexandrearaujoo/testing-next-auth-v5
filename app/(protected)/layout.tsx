import { ReactNode } from 'react';

import { Navbar } from './_components/navbar';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-full flex flex-col gap-y-10 item-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </main>
  );
}
