'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';

export const SettingClient = () => {
  const { currentUser } = useCurrentUser();

  return <section className="bg-white p-10 rounded-xl"></section>;
};
