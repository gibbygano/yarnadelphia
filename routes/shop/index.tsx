import { Head } from "fresh/runtime";
import { Shop } from "islands";
import { define } from "../../utils.ts";

export default define.page(
  ({ state: { inventory, currencyFormat } }) => (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <Head>
        <title>yarnadelphia - Shop</title>
      </Head>
      <Shop inventory={inventory} currencyFormat={currencyFormat} />
    </div>
  ),
);
