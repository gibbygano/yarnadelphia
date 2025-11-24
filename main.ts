import { App, staticFiles } from "fresh";
import type { State } from "./utils.ts";
import type { Inventory } from "./yarnadelphia.types.ts";

import inventory from "./inventory.json" with { type: "json" };

export const app = new App<State>();

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.inventory = inventory as Inventory;

  return await ctx.next();
});

// Include file-system based routes here
app.fsRoutes();
