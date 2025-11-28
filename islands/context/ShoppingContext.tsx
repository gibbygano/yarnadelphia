import { useComputed, useSignal } from "@preact/signals";
import { Cookie } from "@harmless/ht-cookie";
import type { ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import type { VNode } from "preact";
import { useContext, useEffect } from "preact/hooks";
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
  const cartSize = useComputed(() =>
    !cart.value ? 0 : cart.value.reduce((acc, item) => acc + item.quantity, 0)
  );
  const subTotal = useComputed(() =>
    !cart.value ? 0.00 : cart.value.reduce(
      (acc, cartItem) => acc + (cartItem.quantity * cartItem.item.price),
      0.00,
    )
  );

  const addToCart = (itemToAdd: InventoryItem, quantity: number = 1) => {
    if (!cart.value?.find((i) => i.item.id === itemToAdd.id)) {
      cart.value = cart.value
        ? [...cart.value, { item: itemToAdd, quantity }]
        : [{ item: itemToAdd, quantity }];
    } else {
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
    }

    Cookie.set("cart", JSON.stringify(cart.value));
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
    } else {
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
    }

    Cookie.set("cart", JSON.stringify(cart.value));
  };

  useEffect(() => {
    const cartCookie = Cookie.get("cart");
    if (cartCookie) {
      const cartFromCookie: Array<{ item: InventoryItem; quantity: number }> =
        JSON.parse(cartCookie);
      cart.value = cartFromCookie;
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
