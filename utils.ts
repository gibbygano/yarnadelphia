import { createDefine } from "fresh";
import type { Inventory } from "./yarnadelphia.types.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  inventory: Inventory;
  currencyFormat: Intl.NumberFormat;
}

export const define = createDefine<State>();
