import { Timestamp } from '@angular/fire/firestore';
import { Flavors } from './flavors';

export interface OrdersInterface {
  address: string;
  ownerId: string;
  complete: boolean;
  price: number;
  time: Timestamp;

  uid: string;
  flavors: Flavors[];
  drinks?: string[];
}
