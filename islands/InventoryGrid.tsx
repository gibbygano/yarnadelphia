import type { Signal } from "@preact/signals";
import type { Inventory, InventoryItem } from "@/yarnadelphia.types.ts";
import { ProductCard } from "@/components/ProductCard.tsx";
import { useShoppingContext } from "./context/ShoppingContext.tsx";

interface props {
  selectedFilterOption: Signal<string | undefined>;
  searchString: Signal<string | undefined>;
  inventory: Inventory;
}

const InventoryGrid = (
  { inventory: { earrings, headwear }, selectedFilterOption, searchString }:
    props,
) => {
  const { addToCart } = useShoppingContext();

  const search = (item: InventoryItem) => {
    if (!searchString.value) {
      return true;
    }

    return item.name.toLowerCase().includes(
      searchString.value.toLocaleLowerCase(),
    ) ||
      item.description.toLowerCase().includes(
        searchString.value.toLocaleLowerCase(),
      );
  };

  const currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  });
  return (
    <div class="mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-10">
      {(!selectedFilterOption.value ||
        selectedFilterOption.value === "earrings") &&
        earrings.filter(search).map((earring) => (
          <ProductCard
            item={earring}
            currencyFormatter={currencyFormat}
            addToCart={() => addToCart(earring)}
          />
        ))}
      {(!selectedFilterOption.value ||
        selectedFilterOption.value === "headwear") &&
        headwear.filter(search).map((head) => (
          <ProductCard
            item={head}
            currencyFormatter={currencyFormat}
            addToCart={() => addToCart(head)}
          />
        ))}
    </div>
  );
};

export { InventoryGrid };
