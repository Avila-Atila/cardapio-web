import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Pratos } from '../models/pratos.interface';
import { addDoc, setDoc, updateDoc } from '@firebase/firestore';

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
    // extract the id so we don't write it into Firestore:
    const { id, ...data } = prato;

    // no generic here—just point at the path
    const pratoRef = doc(this.firestore, 'pratos', id!);

    // this replaces the document with `data` (all fields from your interface minus `id`)
    return setDoc(pratoRef, data);
  }
}
