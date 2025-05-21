import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map((user) => {
      if (user?.email === 'admin@teste.com') {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
