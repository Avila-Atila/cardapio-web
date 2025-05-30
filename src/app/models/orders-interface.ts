import { Timestamp } from '@angular/fire/firestore';
import { Flavors } from './flavors';

export interface OrdersInterface {
  address: string;
  ownerId: string;
  complete: 'completo' | 'cancelado' | 'pendente';
  price: number;
  time: Timestamp;
  uid: string;
  orderId?: string;
  flavors: Flavors[];
  drinks?: string[];
  paymentType: 'Cartão de Crédito/Débito' | 'Pix' | 'Dinheiro';
}
