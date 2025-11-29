import { getCookies, setCookie } from "@std/http";
import { define } from "@/utils.ts";
import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import { createCart, getCart, updateCart } from "@/pg-helpers.ts";
import { addToCart } from "@/cart-helpers.ts";

export const handler = define.handlers<Cart>({
  async POST(ctx) {
    try {
      const cart_item: CartItem = await ctx.req.json();
      let cart: Cart;

      const cart_id = getCookies(ctx.req.headers).cart;
      if (!cart_id || cart_id === "undefined") {
        cart = await createCart([cart_item]);
      } else {
        cart = await getCart(cart_id);
        const cart_items = addToCart(cart_item, cart.cart_items);
        cart = await updateCart(cart_items, cart_id);
      }

      const respHeaders = new Headers();
      setCookie(respHeaders, {
        name: "cart",
        value: cart.id,
        maxAge: 86400,
        secure: true,
      });
      return new Response(JSON.stringify(cart), { headers: respHeaders });
    } catch (error) {
      console.error(error);
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
