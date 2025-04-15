import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormInputType = z.infer<typeof LoginFormSchema>;
