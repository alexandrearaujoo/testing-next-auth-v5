import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '@/actions/login';
import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

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

    try {
      const res = await login(data);

      if (res?.error) setError(res?.error);

      if (res?.success) {
        form.reset();
        setSuccess(res?.success);
      }

      if (res?.twoFactor) setShowTwoFactor(true);
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return { form, onSubmit, error, success, showTwoFactor };
};
