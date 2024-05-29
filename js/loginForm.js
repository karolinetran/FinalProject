// Importing CSS file for styling the login form
import '../css/loginForm.css';

// Importing necessary Firebase modules
import { auth } from './firebase';

import { renderNewUserForm } from './newUser.js';
import {renderForgottenPwdForm } from './forgottenPwd.js';
import { renderMainMenuForm } from './mainMenu';

// Function to render the login form
export async function renderLoginForm() {
	// Getting the main app container element
    const appDiv = document.getElementById('app');

	// API for fetching a random dog image for background
	fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message; 

			// Generating HTML for the login form with dynamic image background
			const loginFormHTML = `
				<div class="login-page" style="background-image: url(${imageUrl})">
					<h1 class="login-page-header">
						Hund i Oslo!
					</h1>
					<div class="login-page-info">
						<p>
							Her finner du en oversikt over kafeer, restauranter og hoteller hvor du kan ta med din firbente venn!
						</p>
					</div>
					<div class="login-container">
						<h2>Logg inn</h2>
						<div class="input-group">
							<label for="email">E-post:</label>
							<input type="text" id="email" placeholder="Skriv inn e-post">
						</div>
						<div class="input-group">
							<label for="password">Password:</label>
							<input type="password" id="password" placeholder="Skriv inn password">
						</div>
						<button class="btn" id="loginBtn">Logg inn</button>
						<p id="forgottenPwdLink">Glemt passord?</p> 
						<p id="newUserLink">Ikke medlem enda?</p> 
					</div>
				</div>
			`;

			// Rendering the login form HTML to the app container
			appDiv.innerHTML = loginFormHTML;

			// Adding event listeners for login, new user link, and forgotten password link
			const loginBtn = document.getElementById('loginBtn');
			loginBtn.addEventListener('click', handleLogin);

			const newUserLink = document.getElementById('newUserLink');
            newUserLink.addEventListener('click', renderNewUserFormOnClick);

			const forgottenPwdLink = document.getElementById('forgottenPwdLink');
            forgottenPwdLink.addEventListener('click', renderForgottenPwdFormOnClick);
		})
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

// Function to handle login process
function handleLogin() {
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

	// Signing in with email and password
    auth.signInWithEmailAndPassword(emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
			// Storing user data in localStorage
			localStorage.setItem('user', JSON.stringify(user));
			// Rendering the main menu form
			renderMainMenuOnClick();
        })
        .catch((error) => {
            const errorMessage = error.message;
			// Alerting user for incorrect email or password
            alert('Feil e-post eller passord');
            console.error('Error signing in:', errorMessage);
        });
}

// Function to render new user form on link click
function renderNewUserFormOnClick(event) {
    event.preventDefault(); 
    renderNewUserForm();
}

// Function to render forgotten password form on link click
function renderForgottenPwdFormOnClick(event) {
    event.preventDefault(); 
    renderForgottenPwdForm();
}

// Function to render main menu form
function renderMainMenuOnClick(){
	renderMainMenuForm();
}