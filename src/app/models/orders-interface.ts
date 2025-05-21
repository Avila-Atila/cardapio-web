import { Timestamp } from '@angular/fire/firestore';

export interface OrdersInterface {
  address: string;
  ownerId: string;
  complete: boolean;
  price: number;
  time: Timestamp;
  type?: 'media' | 'grande' | 'família';
  uid: string;
  flavors: string[];
  drinks?: string[];
}
