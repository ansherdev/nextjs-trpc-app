import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters')
      .max(32, 'Password must have at most 32 characters'),
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: 'Passwords do not match',
    path: ['confirmedPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

export type IRegisterInput = z.infer<typeof registerSchema>;
export type ILoginInput = z.infer<typeof loginSchema>;
