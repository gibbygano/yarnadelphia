import { useSignal } from "@preact/signals";
import type { ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import type { VNode } from "preact";
import { useContext } from "preact/hooks";
import type { InventoryItem } from "@/yarnadelphia.types.ts";

interface ShoppingContextValue {
  cart: ReadonlySignal<Array<{ item: InventoryItem; quantity: number }> | null>;
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
  const cart = useSignal<
    Array<{ item: InventoryItem; quantity: number }> | null
  >(null);
  const cartSize = useSignal(0);
  const subTotal = useSignal(0.00);

  const updateCartInfo = () => {
    cartSize.value = !cart.value
      ? 0
      : cart.value.reduce((acc, item) => acc + item.quantity, 0);
    subTotal.value = !cart.value ? 0.00 : cart.value.reduce(
      (acc, cartItem) => acc + (cartItem.quantity * cartItem.item.price),
      0.00,
    );
  };

  const addToCart = (itemToAdd: InventoryItem, quantity: number = 1) => {
    if (!cart.value?.find((i) => i.item.id === itemToAdd.id)) {
      cart.value = cart.value
        ? [...cart.value, { item: itemToAdd, quantity }]
        : [{ item: itemToAdd, quantity }];

      updateCartInfo();
      return;
    }

    cart.value = cart.value!.reduce<
      Array<{ item: InventoryItem; quantity: number }>
    >(
      (acc, cartItem) => {
        if (cartItem.item.id === itemToAdd.id) {
          cartItem = { ...cartItem, quantity: cartItem.quantity + quantity };
        }
        acc.push(cartItem);

        return acc;
      },
      [],
    );
    updateCartInfo();
  };

  const removeFromCart = (
    itemToRemove: InventoryItem,
    quantityToRemove: number = 1,
  ) => {
    const itemInCart = cart.value?.find((i) => i.item.id === itemToRemove.id);

    if (!itemInCart) {
      throw new Error("Item not found in cart.");
    }

    if (itemInCart.quantity === 1 || itemInCart.quantity < quantityToRemove) {
      cart.value = cart.value!.filter((i) => i.item.id !== itemToRemove.id);

      updateCartInfo();
      return;
    }

    cart.value = cart.value!.reduce<
      Array<{ item: InventoryItem; quantity: number }>
    >(
      (acc, cartItem) => {
        if (cartItem.item.id === itemToRemove.id) {
          cartItem = {
            ...cartItem,
            quantity: cartItem.quantity - quantityToRemove,
          };
        }
        acc.push(cartItem);

        return acc;
      },
      [],
    );

    updateCartInfo();
  };

  console.log(cart.value, cartSize.value, subTotal.value);

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
