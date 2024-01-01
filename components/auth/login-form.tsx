'use client';

import { useSearchParams } from 'next/navigation';

import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { CardWrapper } from './card-wrapper';

import { useLoginForm } from '@/hooks/useLoginForm';

interface UrlErrors {
  [key: string]: string;
}

const urlErrors: UrlErrors = {
  OAuthAccountNotLinked: 'Email already in use with different provider!'
};

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = urlErrors[searchParams.get('error') ?? ''];
  const { form, error, success, onSubmit } = useLoginForm();

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account ?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <section className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="example@mail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <FormError message={error ?? urlError} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
