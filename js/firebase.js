// firebase.js

// Importing necessary Firebase modules
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

// Initialize Firebase with the provided configuration
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Exporting Firebase authentication, Firestore, and Storage instances
export const auth = firebaseApp.auth();

export const firestore = firebase.firestore();

export const storage = firebaseApp.storage();