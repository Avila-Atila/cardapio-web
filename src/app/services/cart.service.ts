import { Injectable, signal, WritableSignal } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  currentItems: WritableSignal<CartItem[]> = signal<CartItem[]>([]);

  sendInfo(item: CartItem) {
    this.currentItems.update((items) => [...items, item]);
  }

  removeItem(itemToRemove: CartItem) {
    this.currentItems.update(items => {
      const index = items.findIndex(
        item =>
          item.price === itemToRemove.price &&
          item.dishSize === itemToRemove.dishSize &&
          JSON.stringify(item.dishes) === JSON.stringify(itemToRemove.dishes)
      );
  
      if (index === -1) return items;
  
      // Create a shallow copy, remove the item, return updated array
      const updated = [...items];
      updated.splice(index, 1);
      return updated;
    });
  }
  
}
