import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrdersInterface } from '../models/orders-interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private firestore = inject(Firestore);

  /**
   * Returns an Observable that emits your entire pedidos collection as
   * OrdersInterface[], with the document ID mapped into a `uid` field.
   */
  getAllOrders(): Observable<OrdersInterface[]> {
    const pedidosCol = collection(this.firestore, 'pedidos');
    return collectionData(pedidosCol, { idField: 'uid' }) as Observable<
      OrdersInterface[]
    >;
  }
}
