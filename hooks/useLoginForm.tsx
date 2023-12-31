import { useForm } from 'react-hook-form';

import { LoginSchema } from '@/schemas';
import { LoginSchemaProps } from '@/schemas/schemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginForm = () => {
  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginSchemaProps) => {
    console.log(data);
  };

  return { form, onSubmit };
};
