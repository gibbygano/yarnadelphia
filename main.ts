import { App, staticFiles } from "fresh";
import type { State } from "./utils.ts";

export const app = new App<State>();

app.use(staticFiles())
  // Pass a shared value from a middleware
  .use(async (ctx) => await ctx.next())
  // Include file-system based routes here
  .fsRoutes();
