enum InventoryCategory {
  earrings,
  amigurumi,
  hats,
  scarfs,
  patches,
  barrettes,
  pins,
  necklaces,
  fidgets,
}

interface InventoryItem {
  imagePaths: Array<string>;
  name: string;
  id: string;
  category: InventoryCategory;
}

export type { InventoryCategory, InventoryItem };
