import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import type { IPoolProvider } from "@/intrastructure/poolProvider.ts";
import type { UUID } from "node:crypto";

import { BaseRepository } from "./baseRepository.ts";

export interface ICartRepository extends BaseRepository {
  getCart: (cart_id: UUID) => Promise<Cart>;
  createCart: (cart_items: Array<CartItem>) => Promise<Cart>;
  updateCart: (cart_items: Array<CartItem>, cart_id: UUID) => Promise<Cart>;
}

export class CartRepository extends BaseRepository implements ICartRepository {
  constructor(poolProvider: IPoolProvider) {
    super(poolProvider);
  }

  async getCart(cart_id: UUID): Promise<Cart> {
    const result = await this.pool.query("SELECT * FROM cart WHERE id = $1", [
      cart_id,
    ]);

    return result.rows[0];
  }

  async createCart(cart_items: Array<CartItem>) {
    const result = await this.pool.query(
      "INSERT INTO cart (cart_items) VALUES($1) RETURNING *",
      [
        JSON.stringify(cart_items),
      ],
    );

    return result.rows[0];
  }

  async updateCart(cart_items: Array<CartItem>, cart_id: string) {
    const result = await this.pool.query(
      "UPDATE cart SET cart_items = $1 WHERE id = $2 RETURNING *",
      [
        JSON.stringify(cart_items),
        cart_id,
      ],
    );

    return result.rows[0];
  }
}
