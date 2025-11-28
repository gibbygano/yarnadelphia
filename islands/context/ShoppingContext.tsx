import { decode, encode, ValueType } from "@std/msgpack";
import { useComputed, useSignal } from "@preact/signals";
import type { ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import type { VNode } from "preact";
import { useContext, useEffect } from "preact/hooks";
import type { Cart, CartItem, InventoryItem } from "@/yarnadelphia.types.ts";
import { NAMESPACE_DNS, v5 } from "@std/uuid";
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
  const cart = useSignal<
    Cart | null
  >(null);
  const cartSize = useComputed(() =>
    !cart.value
      ? 0
      : cart.value.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );
  const subTotal = useComputed(() =>
    !cart.value ? 0.00 : cart.value.cartItems.reduce(
      (acc, cartItem) => acc + (cartItem.quantity * cartItem.item.price),
      0.00,
    )
  );

  const addToCart = async (itemToAdd: InventoryItem, quantity: number = 1) => {
    if (!cart.value?.cartItems.find((i) => i.item.id === itemToAdd.id)) {
      cart.value = cart.value
        ? {
          ...cart.value,
          cartItems: [...cart.value.cartItems, { item: itemToAdd, quantity }],
        }
        : {
          cartItems: [{ item: itemToAdd, quantity }],
          id: await v5.generate(
            NAMESPACE_DNS,
            new TextEncoder().encode(new Date().toISOString()),
          ),
          dateCreated: new Date(),
        };
    } else {
      cart.value.cartItems = cart.value.cartItems.reduce<Array<CartItem>>(
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
  };

  const removeFromCart = (
    itemToRemove: InventoryItem,
    quantityToRemove: number = 1,
  ) => {
    const itemInCart = cart.value?.cartItems.find((i) =>
      i.item.id === itemToRemove.id
    );

    if (!itemInCart || !cart.value) {
      throw new Error("Item not found in cart.");
    }

    if (itemInCart.quantity === 1 || itemInCart.quantity < quantityToRemove) {
      cart.value.cartItems = cart.value?.cartItems.filter((i) =>
        i.item.id !== itemToRemove.id
      );
    } else {
      cart.value.cartItems = cart.value.cartItems.reduce<Array<CartItem>>(
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
  };

  useEffect(() => {
    const cartCookie = Cookie.get("cart");
    if (cartCookie) {
      try {
        const cartFromCookie = decode(
          Uint8Array.from(atob(cartCookie), (c) => c.charCodeAt(0)),
        );
        cart.value = cartFromCookie as unknown as Cart;
      } catch (e) {
        console.error(
          `Couldn't decode cart from cookie: ${(e as Error).message}`,
        );
      }
    }

    const setCartCookie = () =>
      Cookie.set("cart", encode(cart.value as ValueType), {
        maxAge: 86400,
        secure: true,
      });
    globalThis.addEventListener("beforeunload", setCartCookie);

    return () => {
      globalThis.removeEventListener("beforeunload", setCartCookie);
    };
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
