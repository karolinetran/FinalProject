import { renderLoginForm } from './loginForm.js';
import { renderMainMenuForm } from './mainMenu';
import { renderNotVerified } from './notVerified.js';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', () => {

    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            // User is signed in
            if (firebaseUser.emailVerified) {
                localStorage.setItem('user', JSON.stringify(firebaseUser));
                renderMainMenuForm();
            } else {
                renderNotVerified();
            }
        } else {
            // No user is signed in
            renderLoginForm();
        }
    });
});