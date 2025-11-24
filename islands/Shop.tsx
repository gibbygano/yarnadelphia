import { useSignal } from "@preact/signals";
import { Search } from "./Search.tsx";
import inventory from "@/inventory.ts";
import { InventoryGrid } from "./InventoryGrid.tsx";

const Shop = () => {
  const selectedFilterOption = useSignal<string>();
  const searchString = useSignal<string>();

  return (
    <>
      <div class="mx-20 justify-items-center">
        <Search
          filterOptions={["earrings", "headwear"]}
          searchString={searchString}
          selectedFilterOption={selectedFilterOption}
        />
      </div>
      <InventoryGrid
        inventory={inventory}
        selectedFilterOption={selectedFilterOption}
        searchString={searchString}
      />
    </>
  );
};

export default Shop;
