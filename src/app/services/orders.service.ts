import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrdersInterface } from '../models/orders-interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private firestore = inject(Firestore);

  getAllOrders(): Observable<OrdersInterface[]> {
    const pedidosCol = collection(this.firestore, 'pedidos');
    return collectionData(pedidosCol, { idField: 'uid' }) as Observable<
      OrdersInterface[]
    >;
  }

  addOrder(order: OrdersInterface) {
    const pedidosRef = collection(this.firestore, 'pedidos');
    return addDoc(pedidosRef, order);
  }

  completeOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'pedidos', orderId);
    return updateDoc(orderDocRef, { complete: 'completo' });
  }
  cancelOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'pedidos', orderId);
    return updateDoc(orderDocRef, { complete: 'cancelado' });
  }

  getOrdersByUser(uid: string): Observable<OrdersInterface[]> {
    const pedidosCol = collection(this.firestore, 'pedidos');
    const q = query(pedidosCol, where('uid', '==', uid));
    return collectionData(q) as Observable<OrdersInterface[]>;
  }
}
