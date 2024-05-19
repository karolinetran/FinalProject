// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
	apiKey: "AIzaSyAotf9gTe5IkOh34KYn2CIvG4i1nWXJe1M",
	authDomain: "hundioslo.firebaseapp.com",
	databaseURL: "https://hundioslo-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "hundioslo",
	storageBucket: "hundioslo.appspot.com",
	messagingSenderId: "848384070297",
	appId: "1:848384070297:web:ec841205b80d2490cb9e08",
	measurementId: "G-G0DRWGVJJQ"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();

export const firestore = firebase.firestore();

export const storage = firebaseApp.storage();