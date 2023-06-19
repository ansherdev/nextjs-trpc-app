import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from './prisma';

export async function createContext(opts: CreateNextContextOptions) {
  return {
    req: opts.req,
    res: opts.res,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
