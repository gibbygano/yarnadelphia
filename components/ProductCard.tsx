import { asset } from "fresh/runtime";
import type { InventoryItem } from "../yarnadelphia.types.ts";
import { useRef } from "preact/hooks";
import { Modal } from "components";

interface props {
  item: InventoryItem;
  currencyFormatter: Intl.NumberFormat;
}

const ProductCard = (
  { item: { images, name, price, description, id }, currencyFormatter }: props,
) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div key={id} class="card bg-base-100 w-64 shadow-sm">
        <figure
          onClick={() => modalRef.current?.showModal()}
          class="cursor-pointer"
        >
          <img
            class="object-scale-down"
            src={asset(`/images/${images[0]}`)}
            alt={name}
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-nowrap">{name}</h2>
          <p>
            {description}
          </p>
          <div class="card-actions justify-end">
            <button type="button" class="btn btn-primary group min-w-36">
              <span class="group-hover:hidden">
                {currencyFormatter.format(price)}
              </span>
              <span class="hidden group-hover:block">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      <Modal modalRef={modalRef}>
        <div class="carousel carousel-vertical rounded-box h-[600px]">
          {images.map((i) => (
            <div class="carousel-item h-full">
              <img class="object-scale-down" src={asset(`/images/${i}`)} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export { ProductCard };
