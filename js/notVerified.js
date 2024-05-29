// Importing CSS file for styling the not verified page
import '../css/notVerified.css';

import { renderLoginForm } from './loginForm.js';

// Function to render the not verified page
export function renderNotVerified() {
	// Getting the main app container element
    const appDiv = document.getElementById('app');

	// Generating HTML for the not verified page
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

	// Rendering the not verified page HTML to the app container
    appDiv.innerHTML = notVerifiedHTML;

	// Adding event listener for logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', handleLogout);
}

// Function to handle logout process
function handleLogout() {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    // Render the login form
    renderLoginForm();
}