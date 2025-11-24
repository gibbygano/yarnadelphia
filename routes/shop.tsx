import { Head } from "fresh/runtime";
import { Shop } from "islands";
import { define } from "@/utils.ts";

export default define.page(function ShopPage() {
  return (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <Head>
        <title>yarnadelphia - Shop</title>
      </Head>
      <Shop />
    </div>
  );
});
