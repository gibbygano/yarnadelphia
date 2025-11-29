import type { CartItem, InventoryItem } from "@/yarnadelphia.types.ts";

const addToCart = (
  itemToAdd: CartItem,
  cart_items: Array<CartItem>,
): Array<CartItem> => {
  if (!cart_items) {
    return [itemToAdd];
  }

  if (!cart_items.find((i) => i.item.id === itemToAdd.item.id)) {
    return [...cart_items, itemToAdd];
  }

  return cart_items.reduce<Array<CartItem>>(
    (acc, cartItem) => {
      if (cartItem.item.id === itemToAdd.item.id) {
        cartItem = {
          ...cartItem,
          quantity: cartItem.quantity + itemToAdd.quantity,
        };
      }
      acc.push(cartItem);

      return acc;
    },
    [],
  );
};

const removeFromCart = (
  itemToRemove: InventoryItem,
  quantityToRemove: number = 1,
  cart_items: Array<CartItem>,
): Array<CartItem> => {
  const itemInCart = cart_items.find((i) => i.item.id === itemToRemove.id);

  if (!itemInCart) {
    throw new Error("Item not found in cart.");
  }

  if (itemInCart.quantity === 1 || itemInCart.quantity < quantityToRemove) {
    return cart_items.filter((i) => i.item.id !== itemToRemove.id);
  }

  return cart_items.reduce<Array<CartItem>>(
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
};

export { addToCart, removeFromCart };
