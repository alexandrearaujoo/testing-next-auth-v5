import { CardWrapper } from './card-wrapper';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <section className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </section>
    </CardWrapper>
  );
};
