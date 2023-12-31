import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { register } from '@/actions/register';
import { RegisterSchema } from '@/schemas';
import { RegisterSchemaProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useRegisterForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<RegisterSchemaProps>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = async (data: RegisterSchemaProps) => {
    setError('');
    setSuccess('');
    const { error, success } = await register(data);
    setError(error);
    setSuccess(success);
  };

  return { form, onSubmit, error, success };
};
