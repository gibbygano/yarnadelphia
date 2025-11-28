import { Head } from "fresh/runtime";
import { Shop } from "islands";
import { define } from "@/utils.ts";
import { ShoppingContextProvider } from "context";

export default define.page(function ShopPage() {
  return (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <Head>
        <title>yarnadelphia - Shop</title>
      </Head>
      <ShoppingContextProvider>
        <Shop />
      </ShoppingContextProvider>
    </div>
  );
});
