import { App, staticFiles } from "fresh";
import "@/src/extensions.ts";

export const app = new App();

app.use(staticFiles())
  .fsRoutes();
