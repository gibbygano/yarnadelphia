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

export type { Inventory, InventoryItem };
