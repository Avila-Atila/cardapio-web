import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAX-q6KcC784RkeZV5A23_TmnZZlXqg8Wo',
  authDomain: 'cardapio-web-angular.firebaseapp.com',
  projectId: 'cardapio-web-angular',
  storageBucket: 'cardapio-web-angular.firebasestorage.app',
  messagingSenderId: '412623039',
  appId: '1:412623039:web:5b340129718c68322f660a',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
