import type { Cart, CartItem, InventoryItem } from "@/yarnadelphia.types.ts";
import type { ReadonlySignal } from "@preact/signals";
import type { VNode } from "preact";

import { useComputed, useSignal } from "@preact/signals";
import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";

interface ShoppingContextValue {
  cart: ReadonlySignal<Cart | null>;
  addToCart: (item: InventoryItem, quantity?: number) => void;
  removeFromCart: (item: CartItem, quantityToRemove?: number) => void;
  cartSize: ReadonlySignal<number>;
  subTotal: ReadonlySignal<number>;
}

interface ShoppingContextProviderProps {
  children: VNode | VNode[];
}

const ShoppingContext = createContext<ShoppingContextValue | null>(null);

const ShoppingContextProvider = (
  { children }: ShoppingContextProviderProps,
) => {
  const cart = useSignal<Cart | null>(null);
  const cartSize = useComputed(() =>
    !cart.value
      ? 0
      : cart.value.cart_items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const subTotal = useComputed(() =>
    !cart.value ? 0.00 : cart.value.cart_items.reduce(
      (acc, cartItem) => acc + (cartItem.quantity * cartItem.item.price),
      0.00,
    )
  );

  const addToCart = async (itemToAdd: InventoryItem, quantity: number = 1) => {
    const resp = await fetch("api/cart/add", {
      method: "POST",
      body: JSON.stringify({ item: itemToAdd, quantity }),
    });

    if (!resp.ok) {
      throw new Error(
        `Could not add ${itemToAdd.name} to cart. Reason: ${resp.statusText}`,
      );
    }

    cart.value = await resp.json();
  };

  const removeFromCart = async (
    itemToRemove: CartItem,
    quantityToRemove?: number,
  ) => {
    const resp = await fetch("api/cart/remove", {
      method: "POST",
      body: JSON.stringify({
        cart_item: itemToRemove,
        quantity_to_remove: quantityToRemove,
      }),
    });

    if (!resp.ok) {
      throw new Error(
        `Could not remove ${itemToRemove.item.name} from cart. Reason: ${resp.statusText}`,
      );
    }

    cart.value = await resp.json();
  };

  useEffect(() => {
    const getCart = async () => {
      const cartResp = await fetch("api/cart");
      const cartJson = await cartResp.json();

      cart.value = cartJson;
    };

    if (!cart.value) {
      getCart();
    }
  }, []);

  return (
    <ShoppingContext.Provider
      value={{
        cart,
        cartSize,
        subTotal,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

const useShoppingContext = (): ShoppingContextValue => {
  const shoppingContext = useContext(ShoppingContext);

  if (!shoppingContext) {
    throw new Error(
      "useShoppingContext must be used within a ShoppingContextProvider",
    );
  }
  return shoppingContext;
};

export { ShoppingContextProvider, useShoppingContext };
