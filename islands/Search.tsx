import type { Signal } from "@preact/signals";
import { TbCancel } from "@preact-icons/tb";
import { useRef } from "preact/hooks";

interface props {
  filterOptions: string[];
  selectedFilterOption: Signal<string | undefined>;
  searchString: Signal<string | undefined>;
}

const Search = (
  { filterOptions, selectedFilterOption, searchString }: props,
) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const onSearch = () => {
    searchString.value = searchRef.current?.value;
  };
  const onClear = () => {
    searchString.value = undefined;
    searchRef.current!.value = "";
  };
  return (
    <div>
      <div class="join">
        <div>
          <div>
            <input
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
              ref={searchRef}
              value={searchString?.value}
              class="input join-item rounded-l-sm"
              placeholder="Search"
            />
          </div>
        </div>
        <button
          onClick={onSearch}
          type="button"
          class="btn btn-primary join-item"
        >
          Search
        </button>
        <button
          type="button"
          class="btn btn-neutral join-item rounded-r-sm"
          onClick={onClear}
        >
          <TbCancel class="text-xl" />
        </button>
      </div>
      <div class="filter mt-3">
        <input
          class="btn filter-reset btn-neutral"
          type="radio"
          name="productFilters"
          onClick={() => selectedFilterOption.value = undefined}
          aria-label="All"
        />
        {filterOptions.map((o) => (
          <input
            class="btn btn-secondary"
            type="radio"
            name="productFilters"
            value={o}
            onClick={() => selectedFilterOption.value = o}
            aria-label={o[0].toLocaleUpperCase() + o.substring(1)}
          />
        ))}
      </div>
    </div>
  );
};

export { Search };
