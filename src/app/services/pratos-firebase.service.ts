import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pratos } from '../models/pratos.interface';
import { addDoc, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PratosFirebaseService {
  firestore = inject(Firestore);
  private pratosCollection = collection(this.firestore, 'pratos');
  getPratos(): Observable<Pratos[]> {
    return collectionData(this.pratosCollection, {
      idField: 'id',
    }) as Observable<Pratos[]>;
  }

  addPrato(prato: Pratos) {
    const pratosRef = collection(this.firestore, 'pratos');
    return addDoc(pratosRef, prato);
  }

  deletePrato(id: string) {
    const pratoDoc = doc(this.firestore, `pratos/${id}`);
    return deleteDoc(pratoDoc);
  }

  updatePrato(prato: Pratos) {
    const { id, ...data } = prato;
    const pratoRef = doc(this.firestore, 'pratos', id!);
    return setDoc(pratoRef, data);
  }
}
