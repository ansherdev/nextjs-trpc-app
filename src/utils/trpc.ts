import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from 'server';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : `http://localhost:${process.env.PORT ?? 3000}/api/trpc`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: getBaseUrl(),
          async headers() {
            return {};
          },
        }),
      ],
    };
  },
  ssr: false,
});
