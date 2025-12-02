import { define } from "@/define.ts";
import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import { UUID } from "node:crypto";
import { CartRepository } from "@/src/repositories/cartRepository.ts";
import { Pool } from "pg";
import { CartService } from "@/src/services/cartService.ts";

export const handler = define.handlers<Cart>({
  async POST(ctx) {
    const cartService = new CartService(new CartRepository(new Pool()));
    try {
      const item_to_remove: {
        cart_item: CartItem;
        quantity_to_remove?: number;
      } = await ctx.req.json();
      const cart_id = ctx.req.getCookie("cart");

      const cart = await cartService.removeItemFromCart(
        cart_id as UUID,
        item_to_remove.cart_item,
        item_to_remove.quantity_to_remove,
      );

      return new Response(JSON.stringify(cart));
    } catch (error) {
      console.error(error);
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
