import { inject, Injectable } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  increment,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInfoInterface } from '../models/user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  firestore = inject(Firestore);
  getAllUsers(): Observable<UserInfoInterface[]> {
    const usersCol = collection(this.firestore, 'users');
    return collectionData(usersCol, { idField: 'uid' }) as Observable<
      UserInfoInterface[]
    >;
  }
  incrementOrdersCount(uid: string) {
    const userDoc = doc(this.firestore, 'users', uid);
    return updateDoc(userDoc, { orders: increment(1) });
  }
}
