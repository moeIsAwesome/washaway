// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCdY2wD3xzeIvy2OaDEcA03j4KOCv38h0g',
  authDomain: 'laundry-application-dbd53.firebaseapp.com',
  projectId: 'laundry-application-dbd53',
  storageBucket: 'laundry-application-dbd53.appspot.com',
  messagingSenderId: '453916649073',
  appId: '1:453916649073:web:d04acb09b19106562bddd0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
