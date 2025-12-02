import { define } from "@/define.ts";
import { Cart } from "@/yarnadelphia.types.ts";
import { CartRepository } from "@/src/repositories/cartRepository.ts";
import { Pool } from "pg";
import { CartService } from "@/src/services/cartService.ts";
import { UUID } from "node:crypto";

export const handler = define.handlers<Cart>({
  async GET(ctx) {
    const cartService = new CartService(new CartRepository(new Pool()));
    try {
      const cart_id = ctx.req.getCookie("cart");
      const cart = await cartService.getCart(cart_id as UUID);

      return new Response(JSON.stringify(cart)).addCookie("cart", cart.id);
    } catch (error) {
      console.error(error);
      return new Response(null, {
        status: 500,
        statusText: (error as Error).message,
      });
    }
  },
});
