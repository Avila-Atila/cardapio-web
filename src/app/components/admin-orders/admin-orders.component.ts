import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersInterface } from '../../models/orders-interface';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
type Filter = 'all' | 'completed' | 'pending';
@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent {
  private ordersService = inject(OrdersService);

  orders$!: Observable<OrdersInterface[]>;
  filter = signal<Filter>('all');
  ngOnInit() {
    this.orders$ = this.ordersService.getAllOrders();
  }

  showAllOrders() {
    this.filter.set('all');
  }
  showCompletedOrders() {
    this.filter.set('completed');
  }
  showCurrentOrders() {
    this.filter.set('pending');
  }
  shouldShow(order: OrdersInterface): boolean {
    const f = this.filter();
    return (
      f === 'all' ||
      (f === 'completed' && order.complete) ||
      (f === 'pending' && !order.complete)
    );
  }

  completeOrder(orderId: string) {
    this.ordersService
      .completeOrder(orderId)
      .then(() => {
        console.log(`Order ${orderId} marked complete`);
      })
      .catch((err) => console.error(err));
  }
}
