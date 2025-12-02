import { useSignal } from "@preact/signals";
import { Search } from "./Search.tsx";
import { InventoryGrid } from "./InventoryGrid.tsx";
import inventory from "@/inventory.ts";
import { ShoppingContextProvider } from "./context/ShoppingContext.tsx";

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
      <ShoppingContextProvider>
        <InventoryGrid
          inventory={inventory}
          selectedFilterOption={selectedFilterOption}
          searchString={searchString}
        />
      </ShoppingContextProvider>
    </>
  );
};

export { Shop };
