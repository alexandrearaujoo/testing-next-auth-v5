import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { newVerification } from '@/actions/new-verification';

export const useNewVerificationToken = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    }

    try {
      const res = await newVerification(token);

      if (res.error) setError(res.error);

      if (res.success) setSuccess(res.success);
    } catch (error) {
      setError('Something went wrong!');
    }
  }, [token, error, success]);

  useEffect(() => {
    void (async () => onSubmit())();
  }, [onSubmit]);

  return { error, success };
};
