import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { trpc, appRouter, type Context } from "@opentrader/trpc";

const ctx = {
  user: {
    id: 1,
    email: "onboarding@opentrader.pro",
    displayName: "OpenTrader",
    role: "Admin" as const,
  },
};

// created for each request
export const createContext = ({ req }: CreateFastifyContextOptions): Context => {
  const password = req.headers.authorization;

  if (password === process.env.ADMIN_PASSWORD) {
    return ctx;
  }

  return {
    user: null,
  };
};

const createCaller = trpc.createCallerFactory(appRouter);
export const tServer = createCaller(ctx); // @deprecated
