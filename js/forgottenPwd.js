// Importing CSS styles for forgotten password form
import '../css/forgottenPwd.css';

// Importing Firebase modules
import { sendPasswordResetEmail } from 'firebase/auth';
import { renderLoginForm } from './loginForm.js';
import { auth } from './firebase.js';

// Function to render forgotten password form
export function renderForgottenPwdForm() {
    // Getting the main app container element
    const appDiv = document.getElementById('app');

    // Generate HTML for forgotten password form
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

    // Rendering forgotten password form
    appDiv.innerHTML = forgottenPwdFormHTML;

    // Adding event listener to reset password button and back button
    const resetPwdBtn = document.getElementById('resetPwdBtn');
    resetPwdBtn.addEventListener('click', handleResetPassword);

	const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', backBtnClick);
}

// Function to handle password reset
function handleResetPassword() {
    const emailInput = document.getElementById('email').value;

    // Sending password reset email
    sendPasswordResetEmail(auth, emailInput)
        .then(() => {
            console.log('Password reset email sent:', emailInput);
            alert('Tilbakestilling av passord er sendt til e-posten.');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Error sending password reset email:', errorMessage);
            alert(`Det skjedde en feil: ${errorMessage}`);
        });
}

// Function to handle back button click
function backBtnClick(event) {
    event.preventDefault(); 
    renderLoginForm();
}