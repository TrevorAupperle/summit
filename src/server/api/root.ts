import { createTRPCRouter } from "~/server/api/trpc";
import { credentialsRouter } from "./routers/credentials";
import { userRouter } from "./routers/user";
import { organizationRouter } from "./routers/organization";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  credentials: credentialsRouter,
  user: userRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
