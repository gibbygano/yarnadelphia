import { Pool } from "pg";
import { Cart, CartItem } from "@/yarnadelphia.types.ts";

const getCart = async (cart_id: string): Promise<Cart> => {
  const pool = new Pool();
  const result = await pool.query("SELECT * FROM cart WHERE id = $1", [
    cart_id,
  ]);

  return result.rows[0];
};

const createCart = async (cart_items: Array<CartItem>) => {
  const pool = new Pool();
  const client = await pool.connect();

  const result = await client.query(
    "INSERT INTO cart (cart_items) VALUES($1) RETURNING *",
    [
      JSON.stringify(cart_items),
    ],
  );

  client.release();
  return result.rows[0];
};

const updateCart = async (cart_items: Array<CartItem>, cart_id: string) => {
  const pool = new Pool();
  const client = await pool.connect();

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

export { createCart, getCart, updateCart };
