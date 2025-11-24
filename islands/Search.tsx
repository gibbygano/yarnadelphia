import type { Signal } from "@preact/signals";

interface props {
  filterOptions: string[];
  selectedFilterOption: Signal<string | undefined>;
}

const Search = ({ filterOptions, selectedFilterOption }: props) => (
  <div class="join">
    <div>
      <div>
        <input
          class="input join-item rounded-l-sm w-2xs"
          placeholder="Search"
        />
      </div>
    </div>
    <select
      value={selectedFilterOption.value}
      onChange={(e) => selectedFilterOption.value = e?.currentTarget?.value}
      class="select join-item min-w-fit"
    >
      <option disabled selected>Filter</option>
      {filterOptions.map((o) => (
        <option class="capitalize" key={o}>{o.toWellFormed()}</option>
      ))}
    </select>
    <div class="indicator">
      <button type="button" class="btn btn-primary join-item rounded-r-sm">
        Search
      </button>
    </div>
  </div>
);

export { Search };
