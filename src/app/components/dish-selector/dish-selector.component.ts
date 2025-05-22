import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PratosFirebaseService } from '../../services/pratos-firebase.service';
import { Pratos } from '../../models/pratos.interface';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-dish-selector',
  templateUrl: './dish-selector.component.html',
  styleUrls: ['./dish-selector.component.css'],
  imports: [CommonModule],
})
export class DishSelectorComponent implements OnInit {
  ngOnInit(): void {
    this.dishes.getPratos().subscribe({
      next: (resp) => this.availableDishes.set(resp),
      error: (err) => alert(err),
    });
  }
  availableDishes = signal<Pratos[] | null>(null);
  @Input() size: 'medium' | 'large' | 'family' = 'medium';

  @Input() openState: boolean | undefined = undefined;

  dishes = inject(PratosFirebaseService);
  cartService = inject(CartService);
  get title() {
    return this.size === 'medium'
      ? 'Pizza Média'
      : this.size === 'large'
      ? 'Pizza Grande'
      : 'Pizza família';
  }

  subTotal: number = 0;
  get slices() {
    return this.size === 'medium' ? 6 : this.size === 'large' ? 9 : 12;
  }

  get maxFlavors() {
    return this.size === 'medium' ? 2 : this.size === 'large' ? 3 : 4;
  }

  get price() {
    return this.size === 'medium' ? 32 : this.size === 'large' ? 48 : 64;
  }

  get iconClass() {
    return {
      medium: 'text-primary',
      large: 'text-warning',
      family: 'text-danger',
    }[this.size];
  }

  counts: Record<string, number> = {};
  totalSelected = 0;

  inc(flavor: string, price: number) {
    if (this.totalSelected < this.maxFlavors) {
      this.counts[flavor] = (this.counts[flavor] || 0) + 1;
      this.totalSelected++;
      this.subTotal += price;
    }
  }

  dec(flavor: string, price?: number) {
    if ((this.counts[flavor] || 0) > 0) {
      this.counts[flavor]!--;
      this.totalSelected--;
      if (price) {
        this.subTotal -= price;
      }
    }
  }

  orderHolder: Pratos[] = [];
  sendToHolder(info: Pratos) {
    this.orderHolder!.push(info);
  }
  removeFromHolder(info: Pratos) {
    const idx = this.orderHolder!.findIndex((el) => el.nome === info.nome);
    if (idx > -1) {
      this.orderHolder!.splice(idx, 1);
    }
  }

  checkoutPrice: number = 0;
  pizzaNames: string[] = [];

  sendToCart(infoHolder: Pratos[]) {
    infoHolder.forEach((dish) => {
      this.checkoutPrice += dish.preco;
      this.pizzaNames.push(dish.nome);
    });
    const cartItem: CartItem = {
      price: this.checkoutPrice,
      dishes: this.pizzaNames,
      dishSize: this.title,
    };

    this.cartService.sendInfo(cartItem);
    this.pizzaNames.forEach((element) => {
      this.dec(element);
    });
    this.checkoutPrice = 0;
    this.subTotal = 0;
    this.orderHolder = [];

    this.pizzaNames = [];
  }
}
