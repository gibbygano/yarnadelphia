import { Head } from "fresh/runtime";
import { Shop } from "islands";
import { define } from "@/utils.ts";
import { ShoppingContextProvider } from "context";
import { NavHeader } from "components";

export default define.page(function ShopPage() {
  return (
    <ShoppingContextProvider>
      <NavHeader />
      <div class="px-4 py-8 mx-auto min-h-screen">
        <Head>
          <title>yarnadelphia - Shop</title>
        </Head>
        <Shop />
      </div>
    </ShoppingContextProvider>
  );
});
