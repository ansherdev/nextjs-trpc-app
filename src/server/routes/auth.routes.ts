import { loginHandler, registerHandler } from 'server/controllers';
import { loginSchema, registerSchema } from 'schemas';
import { publicProcedure, router } from 'server/trpc';

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(({ input }) => registerHandler(input)),

  login: publicProcedure
    .input(loginSchema)
    .mutation(({ input }) => loginHandler(input)),
});
