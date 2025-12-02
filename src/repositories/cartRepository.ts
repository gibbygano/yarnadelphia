import type { Pool } from "pg";
import { Cart, CartItem } from "@/yarnadelphia.types.ts";
import { UUID } from "node:crypto";

interface ICartRepository {
  getCart: (cart_id: UUID) => Promise<Cart>;
  createCart: (cart_items: Array<CartItem>) => Promise<Cart>;
  updateCart: (cart_items: Array<CartItem>, cart_id: UUID) => Promise<Cart>;
}

class CartRepository implements ICartRepository {
  constructor(private pool: Pool) {}

  getCart = async (cart_id: UUID): Promise<Cart> => {
    const result = await this.pool.query("SELECT * FROM cart WHERE id = $1", [
      cart_id,
    ]);

    return result.rows[0];
  };

  createCart = async (cart_items: Array<CartItem>) => {
    const client = await this.pool.connect();

    const result = await client.query(
      "INSERT INTO cart (cart_items) VALUES($1) RETURNING *",
      [
        JSON.stringify(cart_items),
      ],
    );

    client.release();
    return result.rows[0];
  };

  updateCart = async (cart_items: Array<CartItem>, cart_id: string) => {
    const client = await this.pool.connect();

    const result = await client.query(
      "UPDATE cart SET cart_items = $1 WHERE id = $2 RETURNING *",
      [
        JSON.stringify(cart_items),
        cart_id,
      ],
    );

    client.release();
    return result.rows[0];
  };
}

export type { ICartRepository };
export { CartRepository };
