import { useSignal } from "@preact/signals";
import { ProductCard } from "components";
import { Search } from "./Search.tsx";
import { Inventory } from "../yarnadelphia.types.ts";

interface props {
  inventory: Inventory;
  currencyFormat: Intl.NumberFormat;
}

const Shop = ({ inventory: { earrings, headwear }, currencyFormat }: props) => {
  const selectedFilterOption = useSignal<string>();
  console.log(selectedFilterOption.value);
  return (
    <>
      <div class="ml-24">
        <Search
          filterOptions={["earrings", "headwear"]}
          selectedFilterOption={selectedFilterOption}
        />
      </div>
      <div class="mx-20 mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-10">
        {selectedFilterOption.value === undefined ||
          selectedFilterOption.value === "earrings" &&
            earrings.map((earring) => (
              <ProductCard
                item={earring}
                currencyFormatter={currencyFormat}
              />
            ))}
        {selectedFilterOption.value === undefined ||
          selectedFilterOption.value === "headwear" &&
            headwear.map((head) => (
              <ProductCard item={head} currencyFormatter={currencyFormat} />
            ))}
      </div>
    </>
  );
};

export { Shop };
