import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  isLoggingOut = false;
  currentUser = signal<UserInfoInterface | null>(null);

  constructor(private router: Router) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (this.isLoggingOut) return;
      if (user) {
        document.getElementById('login__form__close')?.click();
        if (user.email === 'admin@teste.com') {
          this.router.navigate(['/cardapio']);
        }
      } else if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

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

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.currentUser.set(null);
        this.router.navigate(['/']);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  }
}
