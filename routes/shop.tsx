import { Head } from "fresh/runtime";
import { Shop } from "@/islands/Shop.tsx";
import { define } from "@/utils.ts";
import { ShoppingContextProvider } from "@/islands/context/ShoppingContext.tsx";
import { NavHeader } from "@/components/NavHeader.tsx";

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
