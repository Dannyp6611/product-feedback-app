import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'product-feedback-app-16c90.firebaseapp.com',
  projectId: 'product-feedback-app-16c90',
  storageBucket: 'product-feedback-app-16c90.appspot.com',
  messagingSenderId: '1067927029526',
  appId: '1:1067927029526:web:7bbd100f4ab38341053237',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
