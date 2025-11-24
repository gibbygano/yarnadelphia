import { App, staticFiles } from "fresh";
import type { State } from "./utils.ts";
import type { Inventory } from "./yarnadelphia.types.ts";

import inventory from "./inventory.json" with { type: "json" };

export const app = new App<State>();

app.use(staticFiles());

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.inventory = inventory as Inventory;
  ctx.state.currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  });

  return await ctx.next();
});

// Include file-system based routes here
app.fsRoutes();
