import { inject, Injectable } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
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
}
