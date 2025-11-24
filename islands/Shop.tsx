import { useSignal } from "@preact/signals";
import { ProductCard } from "components";
import { Search } from "./Search.tsx";
import type { Inventory, InventoryItem } from "../yarnadelphia.types.ts";

interface props {
  inventory: Inventory;
}

const Shop = ({ inventory: { earrings, headwear } }: props) => {
  const selectedFilterOption = useSignal<string | undefined>();
  const searchString = useSignal<string | undefined>();

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
    <>
      <div class="mx-20 justify-items-center">
        <Search
          filterOptions={["earrings", "headwear"]}
          searchString={searchString}
          selectedFilterOption={selectedFilterOption}
        />
      </div>
      <div class="mx-20 mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-10">
        {(!selectedFilterOption.value ||
          selectedFilterOption.value === "earrings") &&
          earrings.filter(search).map((earring) => (
            <ProductCard
              item={earring}
              currencyFormatter={currencyFormat}
            />
          ))}
        {(!selectedFilterOption.value ||
          selectedFilterOption.value === "headwear") &&
          headwear.filter(search).map((head) => (
            <ProductCard item={head} currencyFormatter={currencyFormat} />
          ))}
      </div>
    </>
  );
};

export { Shop };
