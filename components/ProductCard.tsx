import type { InventoryItem } from "@/yarnadelphia.types.ts";

import { asset } from "fresh/runtime";
import { useRef } from "preact/hooks";
import { Modal } from "@/components/Modal.tsx";
import { TbX } from "@preact-icons/tb";

interface props {
  item: InventoryItem;
  currencyFormatter: Intl.NumberFormat;
  quantityInCart?: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

const ProductCard = (
  {
    item,
    currencyFormatter,
    quantityInCart,
    addToCart,
    removeFromCart,
  }: props,
) => {
  const { images, name, price, description, id } = item;
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
          <h2 class="card-title">{name}</h2>
          <p>
            {description}
          </p>
          <div class="card-actions justify-end">
            <button
              onClick={quantityInCart ? removeFromCart : addToCart}
              type="button"
              class="btn btn-primary group min-w-36"
            >
              {!quantityInCart
                ? (
                  <>
                    <span class="group-hover:hidden">
                      {currencyFormatter.format(price)}
                    </span>
                    <span class="hidden group-hover:block">Add to Cart</span>
                  </>
                )
                : (
                  <>
                    <TbX class="text-lg align-text-bottom" />Remove
                  </>
                )}
            </button>
          </div>
        </div>
      </div>
      <Modal modalRef={modalRef}>
        <div class="carousel carousel-vertical rounded-box h-150">
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
