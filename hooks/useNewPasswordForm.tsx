import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { newPassword } from '@/actions/new-password';
import { NewPasswordSchema } from '@/schemas';
import { NewPasswordProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useNewPasswordForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<NewPasswordProps>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = async (data: NewPasswordProps) => {
    setError('');
    setSuccess('');
    const res = await newPassword(data, token);
    setError(res?.error);
    setSuccess(res?.success);
  };

  return { form, onSubmit, error, success, token };
};
