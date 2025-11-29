import type { UUID } from "node:crypto";

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  images: Array<string>;
  price: number;
}

interface Inventory {
  earrings: Array<InventoryItem>;
  headwear: Array<InventoryItem>;
}

interface CartItem {
  item: InventoryItem;
  quantity: number;
}

interface Cart {
  id: UUID;
  date_created: Date;
  cart_items: Array<CartItem>;
}

export type { Cart, CartItem, Inventory, InventoryItem };
