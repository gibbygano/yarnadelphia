interface InventoryItem {
  id: string;
  name: string;
  description: string;
  images: Array<string>;
  price: number;
  availability: Availability;
}

interface Inventory {
  earrings: Array<InventoryItem>;
  headwear: Array<InventoryItem>;
}

interface Availability {
  available: boolean;
  reason?: string;
}

interface CartItem {
  item: InventoryItem;
  quantity: number;
}

interface Cart {
  id: string;
  timestamp: Date;
  items: Array<CartItem>;
}

export type { Cart, CartItem, Inventory, InventoryItem };
