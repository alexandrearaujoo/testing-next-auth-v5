import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { resetPassword } from '@/actions/reset-password';
import { ResetPasswordSchema } from '@/schemas';
import { ResetPasswordProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useResetPasswordForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<ResetPasswordProps>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: ResetPasswordProps) => {
    setError('');
    setSuccess('');
    const res = await resetPassword(data);
    setError(res?.error);
    setSuccess(res?.success);
  };

  return { form, onSubmit, error, success };
};
