import { asset, Head } from "fresh/runtime";
import { define } from "../../utils.ts";

const Shop = define.page(({ state: { inventory: { earrings, headwear } } }) => {
  return (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <Head>
        <title>yarnadelphia - Shop</title>
      </Head>
      <div class="m-6 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <a
          href="/shop/earrings"
          class="group w-fit relative hover:cursor-pointer"
        >
          <figure class="hover-gallery">
            {earrings.map(({ images, name, description }, i) => (
              <img
                alt={description}
                title={name}
                key={`earring-${i}`}
                src={asset(`images/${images[0]}`)}
                class="object-scale-down"
              />
            ))}
          </figure>
          <div class="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-2 flex justify-center items-end text-xl text-primary-content font-semibold">
            Earrings
          </div>
        </a>
        <a
          href="/shop/headwear"
          class="group w-fit relative hover:cursor-pointer"
        >
          <figure class="hover-gallery">
            {headwear.map(({ images, name, description }, i) => (
              <img
                alt={description}
                title={name}
                key={`headwear-${i}`}
                src={asset(`/images/${images[0]}`)}
                class="object-scale-down"
              />
            ))}
          </figure>
          <div class="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-2 flex justify-center items-end text-xl text-primary-content font-semibold">
            Headwear
          </div>
        </a>
      </div>
    </div>
  );
});

export default Shop;
