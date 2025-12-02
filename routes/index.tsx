import { asset, Head } from "fresh/runtime";
import { define } from "@/define.ts";

export default define.page(function HomePage() {
  return (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <Head>
        <title>yarnadelphia</title>
      </Head>
      <div class="flex">
        <div
          class="hero min-h-screen"
          style={`background-image: url(${
            asset("/images/table/table-0.jpeg")
          })`}
        >
          <div class="hero-overlay"></div>
          <div class="hero-content text-neutral-content text-center rounded-full bg-radial 
          from-pink-500 via-pink-500/40 dark:from-blue-700 dark:via-blue-700/40 to-transparent">
            <div class="max-w-lg">
              <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
              <p class="mb-5">
                <span class="md:text-nowrap">
                  Welcome to yarnadelphia! My name is Rebecca and I love to
                  crochet.
                </span>{" "}
                Would you like some?
              </p>
              <a role="button" class="btn btn-primary" href="/shop">Shop</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
