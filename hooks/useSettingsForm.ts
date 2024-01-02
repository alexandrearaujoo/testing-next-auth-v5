import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCurrentUser } from './useCurrentUser';

import { settings } from '@/actions/settings';
import { SettingsSchema } from '@/schemas';
import { SettingSchemaProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSettingsForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const { update } = useSession();
  const { currentUser } = useCurrentUser();

  const form = useForm<SettingSchemaProps>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: currentUser?.name ?? undefined,
      email: currentUser?.email ?? undefined,
      password: undefined,
      role: currentUser?.role ?? undefined,
      isTwoFactorEnabled: currentUser?.isTwoFactorEnabled ?? undefined
    }
  });

  const onSubmit = async (data: SettingSchemaProps) => {
    setError('');
    setSuccess('');
    try {
      const res = await settings(data);

      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.success) {
        update();
        setSuccess(res.success);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return { form, onSubmit, success, error, currentUser };
};
