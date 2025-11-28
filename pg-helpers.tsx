import { Pool } from "pg";
import { Cart } from "@/yarnadelphia.types.ts";

const getCart = async (cart_id: string) => {
  const pool = new Pool();
  const result: Cart = await pool.query("SELECT * FROM cart WHERE id = $1", [
    cart_id,
  ]);

  return result;
};

export { getCart };
