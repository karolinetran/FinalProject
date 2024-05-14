// newUser.js
import { auth } from './firebase';

import { renderLoginForm } from './loginForm.js';

export function renderNewUserForm() {
    const appDiv = document.getElementById('app');

    const newUserFormHTML = `
    <div class="new-user-page">
		<p id="back-btn">Tilbake</p>
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
        <button class="btn" id="signupBtn">Sign Up</button>
    </div>
    `;

    appDiv.innerHTML = newUserFormHTML;

    const signupBtn = document.getElementById('signupBtn');
    signupBtn.addEventListener('click', handleSignUp);

	const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', backBtnClick);
}

function handleSignUp() {
    const firstNameInput = document.getElementById('firstName').value;
    const lastNameInput = document.getElementById('lastName').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
            user.updateProfile({
                displayName: `${firstNameInput} ${lastNameInput}`
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorMessage);
        });
}

function backBtnClick(event) {
    event.preventDefault(); 
    renderLoginForm();
}