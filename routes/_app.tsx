import { type PageProps } from "$fresh/server.ts";
import Aside from "../components/Aside.tsx";
import Header from "../components/Header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>yarnadelphia</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Header />
        <div class="min-h-screen flex flex-row grid-cols-5">
          <div class="col-span-1 mt-6 ml-4">
            <Aside />
          </div>
          <div class="col-span-4 col-start-2 w-full">
            <Component />
          </div>
        </div>
      </body>
    </html>
  );
}
