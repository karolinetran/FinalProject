import { auth } from './firebase';

import { renderNewUserForm } from './newUser.js';
import {renderForgottenPwdForm } from './forgottenPwd.js';

import { renderMainMenuForm } from './mainMenu';

export async function renderLoginForm() {
    const appDiv = document.getElementById('app');

	fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message; 

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

			appDiv.innerHTML = loginFormHTML;

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

function handleLogin() {
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login successful!');
			renderMainMenuOnClick();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Invalid username or password. Please try again.');
            console.error('Error signing in:', errorMessage);
        });
}

function renderNewUserFormOnClick(event) {
    event.preventDefault(); 
    renderNewUserForm();
}

function renderForgottenPwdFormOnClick(event) {
    event.preventDefault(); 
    renderForgottenPwdForm();
}

function renderMainMenuOnClick(){
	renderMainMenuForm();
}