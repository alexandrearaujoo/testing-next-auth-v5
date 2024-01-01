import { LoginSchema, RegisterSchema, ResetPasswordSchema } from '.';

import * as z from 'zod';

export type LoginSchemaProps = z.infer<typeof LoginSchema>;
export type RegisterSchemaProps = z.infer<typeof RegisterSchema>;
export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;
