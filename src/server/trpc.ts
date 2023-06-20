import { initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const mergeRouters = t.mergeRouters;

const isAuthorized = t.middleware(({ ctx, next }) => {
  return next({ ctx });
});


export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthorized);
