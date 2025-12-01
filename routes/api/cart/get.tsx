import { define } from "@/utils.ts";
import { Cart } from "@/yarnadelphia.types.ts";
import { createCart, getCart } from "@/pg-helpers.ts";
import { getCookies, setCookie } from "@std/http/cookie";

export const handler = define.handlers<Cart>({
  async GET(ctx) {
    try {
      let cart: Cart | null = null;

      const cart_id = getCookies(ctx.req.headers).cart;
      cart = await getCart(cart_id);

      if (cart_id && cart) {
        return new Response(JSON.stringify(cart));
      }

      cart = await createCart([]);

      const respHeaders = new Headers();
      setCookie(respHeaders, {
        name: "cart",
        value: cart!.id,
        maxAge: 86400,
        secure: true,
      });

      return new Response(JSON.stringify(cart), { headers: respHeaders });
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
