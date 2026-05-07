import { TbShoppingCart } from "@preact-icons/tb";
import { useShoppingContext } from "./context/ShoppingContext.tsx";

const CartMenu = () => {
  const { cartSize, subTotal } = useShoppingContext();
  const currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  });
  return (
    <div class="flex">
      <div class="mr-6 dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          class="w-20 h-20 btn btn-ghost btn-circle w:width:"
        >
          <div class="indicator">
            <TbShoppingCart class="text-5xl" />
            {cartSize.value > 0 && (
              <span className="badge badge-sm indicator-item">
                {cartSize.value}
              </span>
            )}
          </div>
        </div>
        {cartSize.value > 0 && (
          <div
            tabIndex={0}
            className="z-1 bg-base-100 shadow mt-3 w-52 card card-compact dropdown-content"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{cartSize.value} Items</span>
              <span className="text-info">
                Subtotal: {currencyFormat.format(subTotal.value)}
              </span>
              <div className="card-actions">
                <button type="button" className="btn-block btn btn-primary">
                  View cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { CartMenu };
