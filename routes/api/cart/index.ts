import type { Cart } from "@/yarnadelphia.types.ts";
import type { UUID } from "node:crypto";

import { define } from "@/define.ts";
import { CartRepository } from "@/src/repositories/cartRepository.ts";
import { CartService } from "@/src/services/cartService.ts";
import { PoolProvider } from "@/intrastructure/poolProvider.ts";

export const handler = define.handlers<Cart>({
  async GET(ctx) {
    const cart_service = new CartService(
      new CartRepository(PoolProvider.instance),
    );

    try {
      const cart_id = ctx.req.getCookie("cart");
      const cart = await cart_service.getCart(cart_id as UUID);

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
