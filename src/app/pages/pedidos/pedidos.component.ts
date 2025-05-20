import { Component } from '@angular/core';
import { AdminNavComponent } from '../../components/admin-nav/admin-nav.component';
import { AdminOrdersComponent } from '../../components/admin-orders/admin-orders.component';

@Component({
  selector: 'app-pedidos',
  imports: [AdminNavComponent, AdminOrdersComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {}
