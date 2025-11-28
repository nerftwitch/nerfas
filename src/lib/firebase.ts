import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDuvW3X-NEOjFw4KvWXVbHtAJPCuvROH3w',
  authDomain: 'nerfas-teste.firebaseapp.com',
  projectId: 'nerfas-teste',
  storageBucket: 'nerfas-teste.firebasestorage.app',
  messagingSenderId: '622257198382',
  appId: '1:622257198382:web:d5cae78fe174dc070e56bf',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
