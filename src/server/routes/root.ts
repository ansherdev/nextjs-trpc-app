import z from 'zod';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;