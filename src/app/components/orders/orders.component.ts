import { Component, inject, Input, input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';
import { map, Observable, of } from 'rxjs';
import { OrdersInterface } from '../../models/orders-interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  private _uid?: string;
  orders$!: Observable<OrdersInterface[]>;

  private ordersService = inject(OrdersService);

  @Input()
  set uid(value: string | undefined) {
    this._uid = value;
    if (this._uid) {
      this.orders$ = this.ordersService.getOrdersByUser(this._uid);
    } else {
      this.orders$ = of([]);
    }
  }
}
