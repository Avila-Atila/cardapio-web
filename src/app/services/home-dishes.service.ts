// src/app/services/pratos.service.ts
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pratos } from '../models/pratos.interface';

@Injectable({ providedIn: 'root' })
export class PratosService {
  firestore = inject(Firestore);
  private pratosCollection = collection(this.firestore, 'pratos');

  getPratos(): Observable<Pratos[]> {
    return collectionData(this.pratosCollection, {
      idField: 'id',
    }) as Observable<Pratos[]>;
  }
}
