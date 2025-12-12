import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import type { IPoolProvider } from "@/intrastructure/poolProvider.ts";

import { BaseRepository } from "./baseRepository.ts";

export interface ICartRepository extends BaseRepository {
  getCart: (cart_id: string) => Promise<Cart | null>;
  createCart: (cart_items: Array<CartItem>) => Promise<Cart>;
  updateCart: (cart_items: Array<CartItem>, cart_id: string) => Promise<Cart>;
}

export class CartRepository extends BaseRepository implements ICartRepository {
  constructor(poolProvider: IPoolProvider) {
    super(poolProvider);
  }

  async getCart(cart_id: string): Promise<Cart | null> {
    const result = await this.pool.cart.findUnique({ where: { id: cart_id } });

    return !result ? null : {
      id: result.id,
      timestamp: result.timestamp,
      items: JSON.parse(result.items!.toLocaleString()),
    };
  }

  async createCart(cart_items: Array<CartItem>) {
    const result = await this.pool.cart.create({
      data: { items: JSON.stringify(cart_items) },
    });

    return {
      id: result.id,
      timestamp: result.timestamp,
      items: JSON.parse(result.items!.toLocaleString()),
    };
  }

  async updateCart(cart_items: Array<CartItem>, cart_id: string) {
    const result = await this.pool.cart.update({
      where: { id: cart_id },
      data: { items: JSON.stringify(cart_items) },
    });

    return {
      id: result.id,
      timestamp: result.timestamp,
      items: JSON.parse(result.items!.toLocaleString()),
    };
  }
}
