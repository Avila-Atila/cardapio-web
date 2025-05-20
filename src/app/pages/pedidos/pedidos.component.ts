import { Component } from '@angular/core';
import { AdminNavComponent } from '../../components/admin-nav/admin-nav.component';
import { AdminOrdersComponent } from '../../components/admin-orders/admin-orders.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-pedidos',
  imports: [AdminNavComponent, AdminOrdersComponent, AdminHeaderComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {}
