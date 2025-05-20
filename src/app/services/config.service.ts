import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ConfigInterface } from '../models/config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  firestore = inject(Firestore);

  private configCollection = collection(this.firestore, 'restaurante-config');
  getConfig(): Observable<ConfigInterface[]> {
    return collectionData(this.configCollection, {
      idField: 'id',
    }) as Observable<ConfigInterface[]>;
  }
  updateConfig(id: string, aberto: boolean) {
    const docRef = doc(this.firestore, 'restaurante-config', id);
    return updateDoc(docRef, { aberto });
  }
}
