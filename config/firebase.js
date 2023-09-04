import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC7ax-XY8m09USDKoxpKh_ubdhDorK7tRo",
  authDomain: "ampela-chat.firebaseapp.com",
  projectId: "ampela-chat",
  storageBucket: "ampela-chat.appspot.com",
  messagingSenderId: "432017910339",
  appId: "1:432017910339:web:7f99a4ca326478adaf82f6"
};

if ( !getApps().length ) initializeApp( firebaseConfig )
export const auth = getAuth();
export const database = getFirestore();