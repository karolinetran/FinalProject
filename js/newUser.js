// Importing CSS file for styling the new user form
import '../css/newUser.css';

// Importing Firebase modules
import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

import { renderLoginForm } from './loginForm.js';

// Function to render the new user form
export function renderNewUserForm() {
    // Getting the main app container element
    const appDiv = document.getElementById('app');

    // Generating HTML for the new user form
    const newUserFormHTML = `
        <div class="new-user-page">
            <p id="back-btn">Tilbake</p>
            <div class="new-user-form">
                <h2>Ny bruker</h2>
                <div class="input-group">
                    <label for="firstName">Fornavn:</label>
                    <input type="text" id="firstName" placeholder="Jan">
                </div>
                <div class="input-group">
                    <label for="lastName">Etternavn:</label>
                    <input type="text" id="lastName" placeholder="Johansen">
                </div>
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="jan.johansen@gmail.com">
                </div>
                <div class="input-group">
                    <label for="password">Passord:</label>
                    <input type="password" id="password" placeholder="Fyll ut et passord...">
                </div>
                <button class="btn" id="signupBtn">Lag bruker</button>
            </div>
        </div>
    `;
    
    // Rendering the new user form HTML to the app container
    appDiv.innerHTML = newUserFormHTML;

    // Adding event listeners for signup button and back button
    const signupBtn = document.getElementById('signupBtn');
    signupBtn.addEventListener('click', handleSignUp);

    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', backBtnClick);
}

// Function to handle user signup process
function handleSignUp() {
    // Retrieving input values from the form
    const firstNameInput = document.getElementById('firstName').value;
    const lastNameInput = document.getElementById('lastName').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Checking if any field is empty, if so alert user
    if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput) {
        alert('Vennligst fyll ut alle feltene.');
        return;
    }

    // Creating user with email and password
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
            
            // Updating user profile with first name and last name
            updateProfile(user, {
                displayName: `${firstNameInput} ${lastNameInput}`
            }).then(() => {
                console.log('User profile updated.');
            }).catch((error) => {
                console.error('Error updating profile:', error);
            });
            
            // Send verification email
            sendEmailVerification(user)
                .then(() => {
                    console.log('Verification email sent.');
                })
                .catch((error) => {
                    console.error('Error sending verification email:', error);
                });
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Error signing up:', errorMessage);
            alert(`Det skjedde en feil: ${errorMessage}`);
        });
}

// Function to handle back button click
function backBtnClick(event) {
    event.preventDefault(); 
    renderLoginForm();
}