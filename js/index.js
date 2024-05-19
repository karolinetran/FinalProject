import { renderLoginForm } from './loginForm.js';
import { renderMainMenuForm } from './mainMenu';

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // If there is a valid user in local storage, render the main menu
        renderMainMenuForm();
    } else {
        // If there is no valid user in local storage, render the login form
        renderLoginForm();
    }
});