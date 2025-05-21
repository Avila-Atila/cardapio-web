import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { OrdersInterface } from '../../models/orders-interface';
import { Timestamp } from '@angular/fire/firestore';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  orderService = inject(OrdersService);
  totalPrice = computed(() =>
    this.cartService.currentItems().reduce((sum, item) => sum + item.price, 0)
  );

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }
  setOrder() {
    const address = this.authService.currentUser()?.address;
    const uid = this.authService.currentUser()?.uid;
    const ownerId = this.authService.currentUser()?.name;
    const flavors: string[] = [];
    this.cartService.currentItems().forEach((element) => {
      flavors.push(element.dishes[0]);
    });
    const order: OrdersInterface = {
      address: address!,
      uid: uid!,
      ownerId: ownerId!,
      flavors: flavors!,
      complete: false,
      price: this.totalPrice(),
      time: Timestamp.now(),
    };
    this.orderService.addOrder(order);
  }
}
