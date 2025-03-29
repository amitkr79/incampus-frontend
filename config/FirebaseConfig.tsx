// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//@ts-ignore
import { getAuth, initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJS01NocvVricctGoZN-ifbkEk1kPLHAM",
  authDomain: "college-app-55ae7.firebaseapp.com",
  projectId: "college-app-55ae7",
  storageBucket: "college-app-55ae7.firebasestorage.app",
  messagingSenderId: "418638196887",
  appId: "1:418638196887:web:761e1fa554fd38417039d2",
  measurementId: "G-YTG6P9KWVN"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})


// const analytics = getAnalytics(app);