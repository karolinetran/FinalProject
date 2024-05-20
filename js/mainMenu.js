import restaurantsImage from '../assets/imgs/restaurants.jpg';
import cafesImage from '../assets/imgs/cafees.jpg';
import hotelsImage from '../assets/imgs/hotels.jpg';

import { renderLoginForm } from './loginForm.js';
import { renderCafees } from './cafees';
import { renderHotels } from './hotels';
import { renderRestaurants } from './restaurants';


export function renderMainMenuForm() {
    const appDiv = document.getElementById('app');

    const user = JSON.parse(localStorage.getItem('user'));
    let username = ''; 
    if (user) {
        username = user.displayName || user.email;
    }

    const mainMenuHTML = `
    <div>
        <div class="header"> <!--Header image with text-->
            <div class="header-info">
                <p>${username}</p>
                <button id="logoutBtn">Logg ut</button>
            </div>
            <h1>Hund i Oslo</h1>
        </div>
        <div class="main-options-container"> <!--Container for options -->
            <div class="option-box option-box-main" id="restaurantOption">   <!--Option box with link to restaurants-->
                <img src="${restaurantsImage}" class="option-box-img">
                <h2>Restauranter</h2>
                <p>Oversikt over restauranter i Oslo hvor du kan ta med din firbente venn!</p>
            </div>
            <div class="option-box option-box-main" id="cafeOption"> <!--Option box with link to cafees-->
                <img src="${cafesImage}" class="option-box-img">
                <h2>Kafeer og barer</h2>
                <p>Oversikt over kafeer og barer i Oslo hvor du kan ta med din firbente venn!</p>
            </div>
            <div class="option-box option-box-main" id="hotelOption"> <!--Option box with link to hotels-->
                <img src="${hotelsImage}" class="option-box-img">
                <h2>Hoteller</h2>
                <p>Oversikt over hundevennlige hotell i Oslo!</p>
            </div>
        </div>
        <div class="footer"> <!--Footer with additional links(not implemented)-->
            <div class="footer-container">
                <a href="https://www.mattilsynet.no/mat-og-drikke/matservering/tilgang-kjaeledyr" class="footer-link">Mattilsynets rettningslinjer</a>
            </div>
            <div class="footer-container">
                <a href="mailto: kamatrrrr@gmail.com" class="footer-link">Kjenner du til nye plasser? <br> Tips oss!</p>
            </div>
        </div>
    </div>
    `;

    appDiv.innerHTML = mainMenuHTML;

    // Add event listeners to each option box
    const restaurantOption = document.getElementById('restaurantOption');
    const cafeOption = document.getElementById('cafeOption');
    const hotelOption = document.getElementById('hotelOption');

    restaurantOption.addEventListener('click', renderRestaurants);
    cafeOption.addEventListener('click', renderCafees);
    hotelOption.addEventListener('click', renderHotels);

    // Add event listener to the logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', handleLogout);
}

function handleLogout() {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    // Render the login form
    renderLoginForm();
}