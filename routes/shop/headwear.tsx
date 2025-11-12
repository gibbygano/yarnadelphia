import { asset } from "fresh/runtime";
import { define } from "../../utils.ts";

const Headwear = define.page(({ state: { inventory: { headwear } } }) => {
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      <div class="flex flex-row gap-10 m-10">
        {headwear.map(({ name, description, images, price, id }) => (
          <div key={id} class="card bg-base-100 w-64 shadow-sm">
            <figure>
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
                <button type="button" class="btn btn-primary group min-w-36">
                  <span class="group-hover:hidden">
                    {numFormatter.format(price)}
                  </span>
                  <span class="hidden group-hover:block">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div class="breadcrumbs text-sm m-5">
        <ul>
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>Headwear</li>
        </ul>
      </div>
    </>
  );
});

export default Headwear;
