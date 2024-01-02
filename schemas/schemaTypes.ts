import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SettingsSchema
} from '.';

import * as z from 'zod';

export type LoginSchemaProps = z.infer<typeof LoginSchema>;
export type RegisterSchemaProps = z.infer<typeof RegisterSchema>;
export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;
export type NewPasswordProps = z.infer<typeof NewPasswordSchema>;
export type SettingSchemaProps = z.infer<typeof SettingsSchema>;
