import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersInterface } from '../../models/orders-interface';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
type Filter = 'all' | 'completed' | 'pending' | 'canceled';
@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent {
  private ordersService = inject(OrdersService);
  private usersService = inject(UsersService);
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
  showCanceledOrders() {
    this.filter.set('canceled');
  }
  shouldShow(order: OrdersInterface): boolean {
    const f = this.filter();
    return (
      f === 'all' ||
      (f === 'completed' && order.complete == 'completo') ||
      (f === 'pending' && order.complete == 'pendente') ||
      (f === 'canceled' && order.complete == 'cancelado')
    );
  }

  completeOrder(orderId: string, ownerId: string) {
    this.ordersService
      .completeOrder(orderId)
      .then(() => {
        this.usersService
          .incrementOrdersCount(ownerId)
          .then(() => console.log('Pedido incrementado'))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));
  }
  cancelOrder(orderId: string) {
    this.ordersService
      .cancelOrder(orderId)
      .then(() => console.log(`cancelar ${orderId} concluido  `))
      .catch((err) => console.log(err));
  }
}
