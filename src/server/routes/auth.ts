import { loginController, registerController } from 'server/controllers';
import { loginSchema, registerSchema } from 'schemas';
import { publicProcedure, router } from 'server/trpc';

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(({ input }) => registerController(input)),

  login: publicProcedure
    .input(loginSchema)
    .mutation(({ input }) => loginController(input)),
});
