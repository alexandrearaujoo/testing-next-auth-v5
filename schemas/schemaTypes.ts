import { LoginSchema } from '.';

import * as z from 'zod';

export type LoginSchemaProps = z.infer<typeof LoginSchema>;
