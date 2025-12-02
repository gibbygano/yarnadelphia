import { Cart, CartItem } from "@/yarnadelphia.types.ts";
import { UUID } from "node:crypto";
import { ICartRepository } from "@/src/repositories/cartRepository.ts";

interface ICartService {
  getCart: (cart_id: UUID | undefined) => Promise<Cart>;
  addItemToCart: (
    cart_id: UUID,
    item: CartItem,
  ) => Promise<Cart>;
  removeItemFromCart: (
    cart_id: UUID,
    item: CartItem,
    quantityToRemove?: number,
  ) => Promise<Cart>;
}

class CartService implements ICartService {
  constructor(private cartRepository: ICartRepository) {}

  getCart = async (cart_id: UUID | undefined) => {
    let cart: Cart | null = null;

    if (cart_id) {
      cart = await this.cartRepository.getCart(cart_id);
    } else if (!cart_id || !cart) {
      cart = await this.cartRepository.createCart([]);
    }

    if (!cart) {
      throw new Error("Could not create cart");
    }

    return cart;
  };

  addItemToCart = async (
    cart_id: UUID,
    item: CartItem,
  ) => {
    const cart = await this.getCart(cart_id);
    let updated_cart_items: Array<CartItem>;

    if (!cart?.cart_items.find((i) => i.item.id === item.item.id)) {
      updated_cart_items = [...cart.cart_items, item];
    } else {
      updated_cart_items = cart.cart_items.reduce<Array<CartItem>>(
        (acc, cartItem) => {
          if (cartItem.item.id === item.item.id) {
            cartItem = {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            };
          }
          acc.push(cartItem);

          return acc;
        },
        [],
      );
    }

    return await this.cartRepository.updateCart(updated_cart_items, cart_id);
  };

  removeItemFromCart = async (
    cart_id: UUID,
    item: CartItem,
    quantityToRemove?: number,
  ) => {
    const cart = await this.getCart(cart_id);
    let updated_cart_items: Array<CartItem>;

    const item_from_cart = cart.cart_items.find((i) =>
      i.item.id === item.item.id
    );

    if (!item_from_cart) {
      throw new Error("Item not found in cart.");
    }

    if (
      !quantityToRemove ||
      item_from_cart.quantity === 1 ||
      item_from_cart.quantity < quantityToRemove
    ) {
      updated_cart_items = cart.cart_items.filter((i) =>
        i.item.id !== item.item.id
      );
    } else {
      updated_cart_items = cart.cart_items.reduce<Array<CartItem>>(
        (acc, cartItem) => {
          if (cartItem.item.id === item.item.id) {
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

    return await this.cartRepository.updateCart(updated_cart_items, cart_id);
  };
}

export type { ICartService };
export { CartService };
