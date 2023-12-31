import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '@/actions/login';
import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginSchemaProps) => {
    setError('');
    setSuccess('');
    const { error, success } = await login(data);
    setError(error);
    setSuccess(success);
  };

  return { form, onSubmit, error, success };
};
