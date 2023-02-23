import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDpprsKGBuIo3zrSEOyMMDxDJUH5G_Wt9o',
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

export { projectFirestore, projectAuth };
