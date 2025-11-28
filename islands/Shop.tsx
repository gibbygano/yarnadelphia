import { useSignal } from "@preact/signals";
import { Search } from "./Search.tsx";
import { InventoryGrid } from "./InventoryGrid.tsx";
import inventory from "@/inventory.ts";

const Shop = () => {
  const selectedFilterOption = useSignal<string>();
  const searchString = useSignal<string>();

  return (
    <>
      <div class="mx-12 justify-items-center">
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

export { Shop };
