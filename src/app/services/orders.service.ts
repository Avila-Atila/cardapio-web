import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
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

  completeOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, 'pedidos', orderId);

    return updateDoc(orderDocRef, { complete: true });
  }
}
