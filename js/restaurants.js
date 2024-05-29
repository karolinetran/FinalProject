import { firestore, storage} from './firebase';
import { renderMainMenuForm } from './mainMenu';

import startImg from '../assets/imgs/star.png'

// Function to render the restaurants page
export function renderRestaurants() {
	// Getting the main app container element
    const appDiv = document.getElementById('app');

	// Generate HTML for the restaurants page
    const restaurantsHTML = `
		<div>
			<div class="home-btn"> <!--Home button to index.html-->
				<p id="back-btn-menu">Tilbake</p>
			</div>
			<div class="filter-and-options-container"> <!--Filter section for service and location-->
				<div class="filtermenu">
				<p class="filter-title">FILTER SØK</p>
				<form id="filter">
					<p>Servering</p>
					<div>
						<input class="filter-checkbox-inout" id="inneservering" type="checkbox">
						<label for="inneservering">Inneservering</label>
					</div>
					<div>
						<input class="filter-checkbox-inout" id="uteservering" type="checkbox">
						<label for="uteservering">Uteservering</label>
					</div>
					<p>Bydel</p>
					<div>
						<input class="filter-checkbox" id="Alna" type="checkbox">
						<label for="Alna">Alna</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Bjerke" type="checkbox">
						<label for="Bjerke">Bjerke</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Frogner" type="checkbox">
						<label for="Frogner">Frogner</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Gamle Oslo" type="checkbox">
						<label for="GamleOslo">Gamle Oslo</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Grorud" type="checkbox">
						<label for="Grorud">Grorud</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Grünerløkka" type="checkbox">
						<label for="Grünerløkka">Grünerløkka</label>
					</div>
					<div>
						<input class="filter-checkbox" id="NordreAker" type="checkbox">
						<label for="NordreAker">Nordre Aker</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Nordstrand" type="checkbox">
						<label for="Nordstrand">Nordstrand</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Sagene" type="checkbox">
						<label for="Sagene">Sagene</label>
					</div>
					<div>
						<input class="filter-checkbox" id="StHanshaugen" type="checkbox">
						<label for="StHanshaugen">St. Hanshaugen</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Stovner" type="checkbox">
						<label for="Stovner">Stovner</label>
					</div>
					<div>
						<input class="filter-checkbox" id="SondreNordstrand" type="checkbox">
						<label for="SondreNordstrand">Søndre Nordstrand</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Ullern" type="checkbox">
						<label for="Ullern">Ullern</label>
					</div>
					<div>
						<input class="filter-checkbox" id="VestreAker" type="checkbox">
						<label for="VestreAker">Vestre Aker</label>
					</div>
					<div>
						<input class="filter-checkbox" id="Ostensjo" type="checkbox">
						<label for="Ostensjo">Østensjø</label>
					</div>
				</form>
				</div>
				<div id="restaurants-container" class="secondary-options-container"> <!--Container to be filled with filtered results from javascript-->
				</div>
			</div>
		</div>
    `;

	// Render crestaurants html
    appDiv.innerHTML = restaurantsHTML;

	// Get restaurants container element
	const restaurantsContainer = document.getElementById('restaurants-container');

	// Function to display restaurants based on filters
	function displayRestaurants(restaurants, images) {
		// Clearing restaurants container
		restaurantsContainer.innerHTML = ''; 

		// initialize variable for any filter matches
		let anyMatch = false;

		// Looping through restaurants
		restaurants.forEach((restaurant,index) => {
			if (isRestaurantMatchingFilters(restaurant)) {
				anyMatch = true;
				// Creating elements for each restaurant passing the filter
				const restaurantDiv = document.createElement('div');
				const restaurantModal = document.createElement('div');
				restaurantDiv.className = 'option-box'; 
				restaurantModal.className = "info-modal";
				restaurantModal.id = `${restaurant.name}`;

				// Setting up restaurant information
				const imageSrc = images[index];
				const averageRating = calculateAverageRating(restaurant.rating);
		
				// Filling restaurant div with data
				restaurantDiv.innerHTML = `
					<a href="#${restaurant.name}">
						<img src=${imageSrc} class="option-box-img">
						<div class="option-box-info-container">
							<div class="title-location-container">
								<h2>${restaurant.name}</h2>
								<div class="location-with-icon">
									<p class="location">${restaurant.location}</p>
								</div>
							</div>
							<div class="rating-container">
								<p>${averageRating}</p>
								<img src=${startImg} class="star-img">
							</div>
							<p>${restaurant.infoShort}</p>
						</div>
					</a>
				`;

				// Filling restaurant modal with data
				restaurantModal.innerHTML = `
					<a class="close-modal" href="#"></a>
					<div>
						<div class="modal-content">
							<img src=${imageSrc} class="modal-img">
							<h2>${restaurant.name} <span> - ${averageRating} <img src=${startImg} class="star-img"></span></h2>
							<p>${restaurant.info}</p>
							<a class="modal-link" href=${restaurant.link}>${restaurant.link}</a>
							<div>
								${restaurant.inneservering ? '<span class="info-tag">Inneservering</span>' : ''}
								${restaurant.uteservering ? '<span class="info-tag">Uteservering</span>' : ''}
							</div>
							<div class="rating-container">
							${generateStarImages()}
							</div>
							<div class="comments-container">
							${renderComments(restaurant.comments)}
							${renderNewCommentInput(restaurant.id)}
							</div>
						</div>
					</div>
				`;
		
				// Appending restaurant div and modal to container
				restaurantsContainer.appendChild(restaurantDiv);
				restaurantsContainer.appendChild(restaurantModal);

				// Adding event listeners for comments and ratings
				const addCommentButton = restaurantModal.querySelector('#add-comment-button');
				addCommentButton.addEventListener('click', () => {
					addNewComment(restaurant.id);
				});

				const starImages = restaurantModal.querySelectorAll('.star-img-user');
				const ratingContainer = restaurantModal.querySelector('.rating-container');
            	starImages.forEach((star, starIndex) => {
					star.addEventListener('click', () => {
						updateRating(restaurant.id, starIndex + 1, ratingContainer);
					});
				});
			};
		});

		// Displaying message if no crestaurants match filters
		if (anyMatch==false){
			restaurantsContainer.innerHTML = '<p>Fant ingen treff...</p>'
		};

		// Adding event listeners for star ratings
		const starContainers = document.querySelectorAll('.rating-container');
    	starContainers.forEach(starContainer => {
			starContainer.addEventListener('mouseover', (event) => {
				const targetStar = event.target;
				const starIndex = Array.from(targetStar.parentElement.children).indexOf(targetStar);

				// Highlighting stars on mouseover
				for (let i = 0; i <= starIndex; i++) {
					targetStar.parentElement.children[i].style.opacity = 1;
				}
			});

			starContainer.addEventListener('mouseout', () => {
				const stars = starContainer.querySelectorAll('.star-img-user');
				// Resetting star opacity on mouseout
				stars.forEach(star => {
					star.style.opacity = 0.4;
				});
			});
		});
	}

	/* RATING */ 
	// Function to generate star images for user ratings
	function generateStarImages() {
        let starImagesHTML = '';
        for (let i = 0; i < 5; i++) {
            starImagesHTML += `<img src=${startImg} class="star-img-user" data-index="${i + 1}">`;
        }
        return starImagesHTML;
    }

	// Function to update restaurant rating in Firestore
	async function updateRating(restaurantId, rating, ratingContainer) {
		try {
			const user = JSON.parse(localStorage.getItem('user'));
			const userId = user ? user.uid : null;
	
			if (!userId) {
				console.error('User not logged in!');
				return;
			}
			console.log(restaurantId)
	
			const restaurantRef = firestore.collection('restaurants').doc(restaurantId);
	
			const restaurantDoc = await restaurantRef.get();
			if (!restaurantDoc.exists) {
				console.error('Restaurant document does not exist!');
				return;
			}
	
			const restaurantRating = restaurantDoc.data().rating || [];
			restaurantRating.push(rating);
	
			await Promise.all([
				restaurantRef.update({ rating: restaurantRating }),
			]);
	
			console.log('Rating updated successfully for restaurant!');
			if (ratingContainer) {
				ratingContainer.innerHTML = 'Takk for din vurdering!';
			}
		} catch (error) {
			console.error('Error updating rating:', error);
		}
	}
	
	// Function to calculate average rating
	function calculateAverageRating(ratings) {
		if (ratings.length === 0) return "-"; 
		const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
		const averageRating = totalRating / ratings.length;
    	return averageRating.toFixed(1);
	}

	/* COMMENTS */
	// Function to render comments
	function renderComments(commentsArray) {
		let html = ''; 
	
		for (let i = 0; i < commentsArray.length; i += 2) {
			const [username, comment] = commentsArray.slice(i, i + 2);

			html += `<div class="comment"><strong>${username}: </strong><span>${comment}</span></div>`;
		}
	
		return html; 
	}

	// Function to add a new comment
	function addNewComment(restaurantName) {
		const user = JSON.parse(localStorage.getItem('user'));
		let username = ''; 
		if (user) {
			username = user.displayName || user.email;
		}
	
		const commentInput = document.getElementById(`comment-${restaurantName}`);
		
		if (username && commentInput) {
			const commentText = commentInput.value.trim();
			commentInput.value = ''; 
	
			if (commentText !== '') {
				const restaurantRef = firestore.collection('restaurants').doc(restaurantName);
	
				return firestore.runTransaction(transaction => {
					return transaction.get(restaurantRef).then(doc => {
						if (!doc.exists) {
							throw new Error('restaurant document does not exist!');
						}
	
						const updatedComments = [...doc.data().comments, username, commentText];
	
						transaction.update(restaurantRef, { comments: updatedComments });
	
						return updatedComments;
					});
				})
				.catch(error => {
					console.error('Error adding comment:', error);
				});
			} else {
				console.warn('Comment cannot be empty!');
			}
		}
	}
	
	// Function to render input for a new comment
	function renderNewCommentInput(restaurantName) {
		return `
			<div class="new-comment">
				<input type="text" id="comment-${restaurantName}" placeholder="Skriv en kommentar...">
				<button id="add-comment-button">Legg til kommentar</button>
			</div>
		`;
	}

	/* FILTER */
	// Function to check if a restaurant matches the applied filters
	function isRestaurantMatchingFilters(restaurant) {
		const locationCheckboxes = document.querySelectorAll('.filter-checkbox');
		const inneserveringCheckbox = document.getElementById('inneservering');
		const uteserveringCheckbox = document.getElementById('uteservering');
		
		let locationChecked = false;
		let locationMatch = false;
		
		for (let checkbox of locationCheckboxes) {
			if (checkbox.checked) {
				locationChecked = true;
				if (restaurant.location === checkbox.id) {
					locationMatch = true;
					break;
				}
			}
		}
		
		
		const inneserveringMatch = !inneserveringCheckbox || !inneserveringCheckbox.checked || restaurant.inneservering;
		const uteserveringMatch = !uteserveringCheckbox || !uteserveringCheckbox.checked || restaurant.uteservering;
	
		// If no location is checked filter only on inneservering and uteservering
		if (!locationChecked) {
			return inneserveringMatch && uteserveringMatch;
		}
	
		return locationMatch && inneserveringMatch && uteserveringMatch;
	}

	/* FIREBASE */

	// Function to fetch images from firebase
	function fetchImages(restaurantNames) {
		return Promise.all(restaurantNames.map(restaurantName => {
			const imageRef = storage.ref(`restaurants/${restaurantName}/1.jpeg`);
			return imageRef.getDownloadURL();
		}));
	}

	// Retrieving restaurant data from Firestore and rendering restaurants
    firestore.collection('restaurants').get()
		.then(snapshot => {
			const restaurants = [];

			// Iterating through snapshot to get restaurant data
			snapshot.forEach(doc => {
				restaurants.push(doc.data());
			});

			// Extracting restaurant names
			const restaurantNames = restaurants.map(restaurant => restaurant.name);
			// Fetching images for restaurants
			return fetchImages(restaurantNames)
				.then(images => ({ restaurants, images })); 
		})
		.then(({ restaurants, images }) => {
			// Displaying restaurants with fetched images
			displayRestaurants(restaurants, images); 
			// Adding event listeners to filter checkboxes
			const filterCheckboxes = document.querySelectorAll('.filter-checkbox, .filter-checkbox-inout');
			filterCheckboxes.forEach(checkbox => {
				checkbox.addEventListener('change', () => {
					displayRestaurants(restaurants, images);
				});
			});
		})
		.catch(error => {
			console.error('Error fetching restaurants:', error);
		});
	
	// Event listener for back button
	const backBtn = document.getElementById('back-btn-menu');
    backBtn.addEventListener('click', backBtnClick);
}

// Function to handle back button click
function backBtnClick(event) {
    event.preventDefault(); 
    renderMainMenuForm();
}