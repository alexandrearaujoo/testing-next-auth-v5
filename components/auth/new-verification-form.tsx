'use client';

import { BeatLoader } from 'react-spinners';

import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { CardWrapper } from './card-wrapper';

import { useNewVerificationToken } from '@/hooks/useNewVerificationForm';

export const NewVerificationForm = () => {
  const { error, success } = useNewVerificationToken();

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <section className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!error && <FormError message={error} />}
      </section>
    </CardWrapper>
  );
};
