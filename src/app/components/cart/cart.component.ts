import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  totalPrice = computed(() =>
    this.cartService.currentItems().reduce((sum, item) => sum + item.price, 0)
  );

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
