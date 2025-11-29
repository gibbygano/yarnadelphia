import { useComputed, useSignal } from "@preact/signals";
import type { ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import type { VNode } from "preact";
import { useContext, useEffect } from "preact/hooks";
import type { Cart, InventoryItem } from "@/yarnadelphia.types.ts";
import { Cookie } from "@harmless/ht-cookie";

interface ShoppingContextValue {
  cart: ReadonlySignal<Cart | null>;
  addToCart: (item: InventoryItem, quantity?: number) => void;
  removeFromCart: (item: InventoryItem, quantityToRemove?: number) => void;
  cartSize: ReadonlySignal<number>;
  subTotal: ReadonlySignal<number>;
}

interface ShoppingContextProviderProps {
  children: VNode | VNode[];
}

const ShoppingContext = createContext<ShoppingContextValue | null>(
  null,
);

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
    console.log(cart.value);
  };

  const removeFromCart = (
    itemToRemove: InventoryItem,
    quantityToRemove: number = 1,
  ) => {
  };

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
