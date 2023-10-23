// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyAJNzpZVgZKQTQXhBdgGDdkuBXsic1Y54k",
  authDomain: "ampela-35b64.firebaseapp.com",
  projectId: "ampela-35b64",
  storageBucket: "ampela-35b64.appspot.com",
  messagingSenderId: "223618739625",
  appId: "1:223618739625:web:24910adc687a63dffa68b8"
};


const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
