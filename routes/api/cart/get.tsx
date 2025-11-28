import { define } from "@/utils.ts";
import { Cart } from "@/yarnadelphia.types.ts";
import { Cookie } from "@harmless/ht-cookie";
import { getCart } from "@/pg-helpers.tsx";

export const handler = define.handlers<Cart>({
  async GET(_) {
    try {
      const cart_id = await Cookie.aGet("cart");
      if (!cart_id) {
        return new Response(null, {
          status: 400,
          statusText: "No cart_id provided.",
        });
      }

      const cart = await getCart(cart_id);

      if (cart) {
        return new Response(JSON.stringify(cart));
      }

      return new Response(null, {
        status: 404,
        statusText: `Could not find cart with id ${cart_id}.`,
      });
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
