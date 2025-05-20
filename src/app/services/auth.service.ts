import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import {
  from,
  Observable,
  switchMap,
  of,
  tap,
  catchError,
  throwError,
} from 'rxjs';
import { UserInfoInterface } from '../models/user-info.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser = signal<UserInfoInterface | null>(null);

  login(email: string, password: string): Observable<UserInfoInterface> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) => {
        const userDoc = doc(this.firestore, `users/${cred.user.uid}`);
        return docData(userDoc, {
          idField: 'uid',
        }) as Observable<UserInfoInterface>;
      }),
      tap((profile) => {
        this.currentUser.set(profile);
      }),
      catchError((err) => {
        this.currentUser.set(null);
        return throwError(() => err);
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
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap((cred) => {
        return from(updateProfile(cred.user, { displayName: name }));
      }),
      switchMap(() => {
        const user = this.auth.currentUser as User;
        const userRef = doc(this.firestore, `users/${user.uid}`);
        const data: UserInfoInterface = {
          uid: user.uid,
          email: user.email!,
          name,
          address,
          tel,
          orders: 0,
        };
        return from(setDoc(userRef, data));
      }),

      switchMap(() => of(void 0))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.currentUser.set(null);
      })
    );
  }
}
