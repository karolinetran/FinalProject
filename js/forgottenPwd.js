// forgottenPwd.js
import '../css/forgottenPwd.css';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { renderLoginForm } from './loginForm.js';
import { auth } from './firebase.js';


export function renderForgottenPwdForm() {
    const appDiv = document.getElementById('app');

    const forgottenPwdFormHTML = `
        <div class="forgotten-pwd-page">
			<p id="back-btn">Tilbake</p>
            <div class="forgotten-pwd-form">
                <h2>Glemt Passord</h2>
                <p>Skriv inn eposten din for å få tilsendt tilsendt nytt passord</p>
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="Skriv inn e-mail">
                </div>
                <button class="btn" id="resetPwdBtn">Tilbakestill passord</button>
            </div>
        </div>
    `;

    appDiv.innerHTML = forgottenPwdFormHTML;

    const resetPwdBtn = document.getElementById('resetPwdBtn');
    resetPwdBtn.addEventListener('click', handleResetPassword);

	const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', backBtnClick);
}

function handleResetPassword() {
    const emailInput = document.getElementById('email').value;

    sendPasswordResetEmail(auth, emailInput)
        .then(() => {
            console.log('Password reset email sent:', emailInput);
            alert('Tilbakestilling av passord er sendt til e-posten.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error sending password reset email:', errorMessage);
            alert(`Det skjedde en feil: ${errorMessage}`);
        });
}

function backBtnClick(event) {
    event.preventDefault(); 
    renderLoginForm();
}