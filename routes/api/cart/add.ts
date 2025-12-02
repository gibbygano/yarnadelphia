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
      const cart_item: CartItem = await ctx.req.json();
      const cart_id = ctx.req.getCookie("cart");

      const cart = await cartService.addItemToCart(cart_id as UUID, cart_item);

      return new Response(JSON.stringify(cart)).addCookie("cart", cart!.id);
    } catch (error) {
      console.error(error);
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
