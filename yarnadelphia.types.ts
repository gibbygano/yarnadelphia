interface Availability {
  inventoryItemId: string;
  available: boolean;
  reason?: string;
}

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

interface EventDate {
  start: Date;
  end: Date;
}

interface Event {
  key: string;
  name: string;
  date: EventDate;
  link: string;
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

export type { Availability, Cart, CartItem, Event, Inventory, InventoryItem };
