import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersInterface } from '../../models/orders-interface';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent {
  private ordersService = inject(OrdersService);

  orders$!: Observable<OrdersInterface[]>;
  showOrder = signal(false);
  ngOnInit() {
    this.orders$ = this.ordersService.getAllOrders();
  }

  showAllOrders() {}
}
