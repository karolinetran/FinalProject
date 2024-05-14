// forgottenPwd.js
import { renderLoginForm } from './loginForm.js';

export function renderForgottenPwdForm() {
    const appDiv = document.getElementById('app');

    const forgottenPwdFormHTML = `
        <div class="forgotten-pwd-page">
			<p id="back-btn">Tilbake</p>
            <h2>Glemt Passord</h2>
            <p>Skriv inn eposten din for å få tilsendt tilsendt nytt passord</p>
            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Skriv inn e-mail">
            </div>
            <button class="btn" id="resetPwdBtn">Tilbakestill passord</button>
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

    console.log('Passord tilbakestilt via email:', emailInput);
}

function backBtnClick(event) {
    event.preventDefault(); 
    renderLoginForm();
}