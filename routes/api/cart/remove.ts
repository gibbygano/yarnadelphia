import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import type { UUID } from "node:crypto";

import { define } from "@/define.ts";
import { CartRepository } from "@/src/repositories/cartRepository.ts";
import { CartService } from "@/src/services/cartService.ts";
import { PoolProvider } from "@/intrastructure/poolProvider.ts";

export const handler = define.handlers<Cart>({
  async POST(ctx) {
    const cart_service = new CartService(
      new CartRepository(PoolProvider.instance),
    );

    try {
      const item_to_remove: {
        cart_item: CartItem;
        quantity_to_remove?: number;
      } = await ctx.req.json();
      const cart_id = ctx.req.getCookie("cart");

      const cart = await cart_service.removeItemFromCart(
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
