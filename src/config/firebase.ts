import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJq0Pd6tYC69emH_JqYM8WtkKUlQmOdjA",
  authDomain: "healthmate-98aa7.firebaseapp.com",
  projectId: "healthmate-98aa7",
  storageBucket: "healthmate-98aa7.appspot.com",  //  <--- FIXED
  messagingSenderId: "423564587252",
  appId: "1:423564587252:web:5c34009c17345233032ea1",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
