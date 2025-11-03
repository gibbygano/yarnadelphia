import { NavHeader } from "components";
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>yarnadelphia</title>
      </head>
      <body class="bg-base-200">
        <header class="sticky">
          <NavHeader />
        </header>
        <Component />
      </body>
    </html>
  );
});
