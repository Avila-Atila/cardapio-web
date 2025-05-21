import { Component, inject } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrdersInterface } from '../../models/orders-interface';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  orders$?: Observable<OrdersInterface[]>;

  loadOrders() {
    const uid = this.authService.currentUser()?.uid;
    if (!uid) {
      console.warn('Usuário não logado — não carregando pedidos.');
      return;
    }

    const pedidosRef = collection(this.firestore, 'pedidos');
    const pedidosQuery = query(pedidosRef, where('ownerId', '==', uid));

    this.orders$ = collectionData(pedidosQuery, {
      idField: 'uid',
    }) as Observable<OrdersInterface[]>;
  }

  reorder(order: OrdersInterface) {
    console.log('Re-ordering', order.uid);
  }
}
