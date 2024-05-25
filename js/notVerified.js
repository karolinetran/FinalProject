import '../css/notVerified.css';
import { renderLoginForm } from './loginForm.js';

export function renderNotVerified() {
    const appDiv = document.getElementById('app');

    const notVerifiedHTML = `
		<div class="not-verified-container">
			<div class="not-verified-box">
				<h2>Bruker er ikke verifisert</h2>
				<p>
					Du har fått tilsendt en e-post for verifisering. 
					Vennligst verifiser brukeren og last inn siden på nytt. 
				</p>
				<button id="logoutBtn">Logg ut</button>
			</div>
		</div>
    `;

    appDiv.innerHTML = notVerifiedHTML;

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', handleLogout);
}

function handleLogout() {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    // Render the login form
    renderLoginForm();
}