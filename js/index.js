import { renderLoginForm } from './loginForm.js';
import { renderMainMenuForm } from './mainMenu';
import { renderNotVerified } from './notVerified.js';

// Importing Firebase modules
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

// Waiting for DOM content to load
document.addEventListener('DOMContentLoaded', () => {

    // Listening for authentication state changes
    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            // User is signed in
            if (firebaseUser.emailVerified) {
                // If user's email is verified, store user data and render main menu
                localStorage.setItem('user', JSON.stringify(firebaseUser));
                renderMainMenuForm();
            } else {
                // If user's email is not verified, render not verified page
                renderNotVerified();
            }
        } else {
            // No user is signed in, render login form
            renderLoginForm();
        }
    });
});