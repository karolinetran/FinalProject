import restaurantsImage from '../assets/imgs/restaurants.jpg';
import cafesImage from '../assets/imgs/cafees.jpg';
import hotelsImage from '../assets/imgs/hotels.jpg';


export function renderMainMenuForm() {
    const appDiv = document.getElementById('app');

    const mainMenuHTML = `
    <div>
		<div class="header"> <!--Header image with text-->
			<h1>Hund i Oslo</h1>
		</div>
		<div class="main-options-container"> <!--Container for options -->
			<div class="option-box">	<!--Option box with link to restaurants-->
				<a href="./restaurants.html" id="restaurant-link" class="page-link">
					<img src="${restaurantsImage}" class="option-box-img">
					<h2>Restauranter</h2>
					<p>Oversikt over restauranter i Oslo hvor du kan ta med din firbente venn!</p>
				</a>
			</div>
			<div class="option-box"> 	<!--Option box with link to cafees-->
				<a href="./cafees.html" id="cafe-link" class="page-link">
					<img src="${cafesImage}" class="option-box-img">
					<h2>Kafeer og barer</h2>
					<p>Oversikt over kafeer og barer i Oslo hvor du kan ta med din firbente venn!</p>
				</a>
			</div>
			<div class="option-box"> <!--Option box with link to hotels-->
				<a href="./hotels.html" id="hotel-link" class="page-link">
					<img src="${hotelsImage}" class="option-box-img">
					<h2>Hoteller</h2>
					<p>Oversikt over hundevennlige hotell i Oslo!</p>
				</a>
			</div>
		</div>
		<div class="footer"> <!--Footer with additional links(not implemented)-->
			<div class="footer-container">
				<p class="footer-link">Informasjon / Om oss</p>
			</div>
			<div class="footer-container">
				<p class="footer-link">Mattilsynets rettningslinjer</p>
			</div>
			<div class="footer-container">
				<p class="footer-link">Kjenner du til nye plasser? <br> Tips oss!</p>
			</div>
		</div>
	</div>
    `;

    appDiv.innerHTML = mainMenuHTML;
}