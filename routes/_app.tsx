import { define } from "@/define.ts";
import { Footer } from "@/components/Footer.tsx";
import { EventsContextProvider } from "@/islands/context/EventsContext.tsx";
import EventAlerts from "@/islands/EventAlerts.tsx";
import { Partial } from "fresh/runtime";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>YARNADELPHIA</title>
      </head>
      <body class="bg-base-200" f-client-nav>
        <EventsContextProvider>
          <EventAlerts />
        </EventsContextProvider>
        <Partial name="body">
          <Component />
        </Partial>
      </body>
      <Footer />
    </html>
  );
});
