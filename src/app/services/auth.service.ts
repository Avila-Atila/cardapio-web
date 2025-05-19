// auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { from, Observable, switchMap, of } from 'rxjs';
import { UserInfoInterface } from '../models/user-info.interface';
import { UserInterface } from '../models/user.interface';

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  address: string;
  tel: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$ = user(this.auth);
  currentuser = signal<UserInterface | null | undefined>(undefined);

  login(email: string, password: string): Observable<UserInfoInterface> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) => {
        // now fetch the Firestore doc you wrote at registration
        const userDoc = doc(this.firestore, `users/${cred.user.uid}`);
        return docData(userDoc, {
          idField: 'uid',
        }) as Observable<UserInfoInterface>;
      })
    );
  }

  register(
    email: string,
    password: string,
    name: string,
    address: string,
    tel: string
  ): Observable<void> {
    // 1) Create Firebase Auth user
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      // 2) Update their displayName in Auth profile
      switchMap((cred) => {
        return from(updateProfile(cred.user, { displayName: name }));
      }),
      // 3) Write the rest of the profile into Firestore
      switchMap(() => {
        const user = this.auth.currentUser as User;
        const userRef = doc(this.firestore, `users/${user.uid}`);
        const data: AppUser = {
          uid: user.uid,
          email: user.email!,
          name,
          address,
          tel,
        };
        return from(setDoc(userRef, data));
      }),
      // 4) Map to void so callers just know “it completed”
      switchMap(() => of(void 0))
    );
  }
}

// name:string, address:string, tel:string
