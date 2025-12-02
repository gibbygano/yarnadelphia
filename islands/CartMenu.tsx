import { TbShoppingCart } from "@preact-icons/tb";
import { useShoppingContext } from "./context/ShoppingContext.tsx";

const CartMenu = () => {
  const { cartSize, subTotal } = useShoppingContext();
  const currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  });
  return (
    <div class="flex-none">
      <div class="dropdown dropdown-end mr-6">
        <div
          tabIndex={0}
          role="button"
          class="btn btn-ghost btn-circle w:width: h-24 w-24"
        >
          <div class="indicator">
            <TbShoppingCart class="text-6xl" />
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
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cartSize.value} Items</span>
              <span className="text-info">
                Subtotal: {currencyFormat.format(subTotal.value)}
              </span>
              <div className="card-actions">
                <button type="button" className="btn btn-primary btn-block">
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
