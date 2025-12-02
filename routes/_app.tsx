import { define } from "@/define.ts";
import { Footer } from "@/components/Footer.tsx";
import { NavHeader } from "@/components/NavHeader.tsx";

export default define.page(function App({ Component, route }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>yarnadelphia</title>
      </head>
      <body class="bg-base-200">
        <NavHeader isHomepage={route === "/"} />
        <Component />
      </body>
      <Footer />
    </html>
  );
});
