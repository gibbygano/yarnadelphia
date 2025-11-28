import { Cookie } from "@harmless/ht-cookie";
import { define } from "@/utils.ts";
import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import { getCart } from "@/pg-helpers.tsx";

const createCart: Cart = async () => {
};

const addToCart = async (cart: Cart) => {
};

export const handler = define.handlers<Cart>({
  async POST(ctx) {
    try {
      let cart: Cart;
      const cart_id = await Cookie.aGet("cart");

      if (!cart_id) {
        cart = await createCart();
      } else {
        cart = await getCart(cart_id);
      }

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
