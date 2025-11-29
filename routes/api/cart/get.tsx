import { define } from "@/utils.ts";
import { Cart } from "@/yarnadelphia.types.ts";
import { createCart, getCart } from "@/pg-helpers.ts";
import { getCookies } from "@std/http/cookie";

export const handler = define.handlers<Cart>({
  async GET(ctx) {
    try {
      let cart: Cart | null = null;

      const cart_id = getCookies(ctx.req.headers).cart;
      if (cart_id) {
        cart = await getCart(cart_id);
      }

      if (!cart_id || !cart) {
        cart = await createCart([]);
      }

      return new Response(JSON.stringify(cart));
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
