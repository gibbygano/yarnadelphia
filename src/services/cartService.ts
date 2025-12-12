import type { Cart, CartItem } from "@/yarnadelphia.types.ts";
import type { ICartRepository } from "@/src/repositories/cartRepository.ts";
import type { UUID } from "node:crypto";

export interface ICartService {
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

export class CartService implements ICartService {
  private _cart_repository: ICartRepository;

  constructor(cartRepository: ICartRepository) {
    this._cart_repository = cartRepository;
  }

  async getCart(cart_id: UUID | undefined) {
    let cart: Cart | null = null;

    if (cart_id) {
      cart = await this._cart_repository.getCart(cart_id);
    } else if (!cart_id || !cart) {
      cart = await this._cart_repository.createCart([]);
    }

    if (!cart) {
      throw new Error("Could not create cart");
    }

    return cart;
  }

  async addItemToCart(
    cart_id: UUID,
    item: CartItem,
  ) {
    const cart = await this.getCart(cart_id);
    let updated_cart_items: Array<CartItem>;

    if (!cart?.items.find((i) => i.item.id === item.item.id)) {
      updated_cart_items = [...cart.items, item];
    } else {
      updated_cart_items = cart.items.reduce<Array<CartItem>>(
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

    return await this._cart_repository.updateCart(updated_cart_items, cart_id);
  }

  async removeItemFromCart(
    cart_id: UUID,
    item: CartItem,
    quantityToRemove?: number,
  ) {
    const cart = await this.getCart(cart_id);
    let updated_cart_items: Array<CartItem>;

    const item_from_cart = cart.items.find((i) => i.item.id === item.item.id);

    if (!item_from_cart) {
      throw new Error("Item not found in cart.");
    }

    if (
      !quantityToRemove ||
      item_from_cart.quantity === 1 ||
      item_from_cart.quantity < quantityToRemove
    ) {
      updated_cart_items = cart.items.filter((i) => i.item.id !== item.item.id);
    } else {
      updated_cart_items = cart.items.reduce<Array<CartItem>>(
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

    return await this._cart_repository.updateCart(updated_cart_items, cart_id);
  }
}
