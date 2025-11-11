import superjson from "superjson";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { appRouter } from "@opentrader/trpc";

import { getSettings } from "./utils/settings.js";

export const createDaemonRpcClient = () => {
  const { host, port } = getSettings();

  const DAEMON_URL = `http://${host}:${port}/api/trpc`;

  return createTRPCProxyClient<typeof appRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: DAEMON_URL,
        headers: () => ({
          Authorization: process.env.ADMIN_PASSWORD,
        }),
      }),
    ],
  });
};
