import { firestore, storage} from './firebase';
import { renderMainMenuForm } from './mainMenu';

import startImg from '../assets/imgs/star.png'

export function renderHotels() {
    const appDiv = document.getElementById('app');

    const hotelsHTML = `
		<div>
			<div class="home-btn"> <!--Home button to index.html-->
				<p id="back-btn-menu">Tilbake</p>
			</div>
			<div class="filter-and-options-container"> <!--Filter section for service and location-->
				<div class="filtermenu">
				<p class="filter-title">FILTER SØK</p>
				<form id="filter">
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
				<div id="hotels-container" class="secondary-options-container"> <!--Container to be filled with filtered results from javascript-->
				</div>
			</div>
		</div>
    `;

    appDiv.innerHTML = hotelsHTML;

	const hotelsContainer = document.getElementById('hotels-container');

	function displayHotels(hotels, images) {
		hotelsContainer.innerHTML = ''; 
		let anyMatch = false;

		hotels.forEach((hotel,index) => {
			if (isHotelMatchingFilters(hotel)) {
				anyMatch = true;
				const hotelDiv = document.createElement('div');
				const hotelModal = document.createElement('div');
				hotelDiv.className = 'option-box'; 
				hotelModal.className = "info-modal";
				hotelModal.id = `${hotel.name}`;

				const imageSrc = images[index];
				const averageRating = calculateAverageRating(hotel.rating);
		
				hotelDiv.innerHTML = `
					<a href="#${hotel.name}">
						<img src=${imageSrc} class="option-box-img">
						<div class="option-box-info-container">
							<div class="title-location-container">
								<h2>${hotel.name}</h2>
								<div class="location-with-icon">
									<p class="location">${hotel.location}</p>
								</div>
							</div>
							<div class="rating-container">
								<p>${averageRating}</p>
								<img src=${startImg} class="star-img">
							</div>
							<p>${hotel.infoShort}</p>
						</div>
					</a>
				`;

				hotelModal.innerHTML = `
					<a class="close-modal" href="#"></a>
					<div>
						<div class="modal-content">
							<img src=${imageSrc} class="modal-img">
							<h2>${hotel.name} <span> - ${averageRating} <img src=${startImg} class="star-img"></span></h2>
							<p>${hotel.info}</p>
							<a class="modal-link" href=${hotel.link}>${hotel.link}</a>
							<div class="rating-container">
							${generateStarImages()}
							</div>
							<div class="comments-container">
							${renderComments(hotel.comments)}
							${renderNewCommentInput(hotel.id)}
							</div>
						</div>
					</div>
				`;
		
				hotelsContainer.appendChild(hotelDiv);
				hotelsContainer.appendChild(hotelModal);

				const addCommentButton = hotelModal.querySelector('#add-comment-button');
				addCommentButton.addEventListener('click', () => {
					addNewComment(hotel.id);
				});

				const starImages = hotelModal.querySelectorAll('.star-img-user');
				const ratingContainer = hotelModal.querySelector('.rating-container');
            	starImages.forEach((star, starIndex) => {
					star.addEventListener('click', () => {
						updateRating(hotel.id, starIndex + 1, ratingContainer); 
					});
				});
			};
		});

		if (anyMatch==false){
			hotelsContainer.innerHTML = '<p>Fant ingen treff...</p>'
		};

		const starContainers = document.querySelectorAll('.rating-container');
    	starContainers.forEach(starContainer => {
			starContainer.addEventListener('mouseover', (event) => {
				const targetStar = event.target;
				const starIndex = Array.from(targetStar.parentElement.children).indexOf(targetStar);

				for (let i = 0; i <= starIndex; i++) {
					targetStar.parentElement.children[i].style.opacity = 1;
				}
			});

			starContainer.addEventListener('mouseout', () => {
				const stars = starContainer.querySelectorAll('.star-img-user');
				stars.forEach(star => {
					star.style.opacity = 0.4;
				});
			});
		});
	}

	/* RATING */ 
	function generateStarImages() {
        let starImagesHTML = '';
        for (let i = 0; i < 5; i++) {
            starImagesHTML += `<img src=${startImg} class="star-img-user" data-index="${i + 1}">`;
        }
        return starImagesHTML;
    }

	async function updateRating(hotelId, rating, ratingContainer) {
		try {
			const user = JSON.parse(localStorage.getItem('user'));
			const userId = user ? user.uid : null;
	
			if (!userId) {
				console.error('User not logged in!');
				return;
			}
	
			const hotelRef = firestore.collection('hotels').doc(hotelId);
	
			const hotelDoc = await hotelRef.get();
			if (!hotelDoc.exists) {
				console.error('hotel document does not exist!');
				return;
			}
	
			const hotelRating = hotelDoc.data().rating || [];
			hotelRating.push(rating);
	
			await Promise.all([
				hotelRef.update({ rating: hotelRating }),
			]);
	
			console.log('Rating updated successfully for hotel!');
			if (ratingContainer) {
				ratingContainer.innerHTML = 'Takk for din vurdering!';
			}
		} catch (error) {
			console.error('Error updating rating:', error);
		}
	}
	

	function calculateAverageRating(ratings) {
		if (ratings.length === 0) return "-"; 
		const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
		const averageRating = totalRating / ratings.length;
    	return averageRating.toFixed(1);
	}

	/* COMMENTS */
	function renderComments(commentsArray) {
		let html = ''; 
	
		for (let i = 0; i < commentsArray.length; i += 2) {
			const [username, comment] = commentsArray.slice(i, i + 2);
			html += `<div class="comment"><strong>${username}: </strong><span>${comment}</span></div>`;
		}
	
		return html; 
	}

	function addNewComment(hotelName) {
		const user = JSON.parse(localStorage.getItem('user'));
		let username = ''; 
		if (user) {
			username = user.displayName || user.email;
		}
	
		const commentInput = document.getElementById(`comment-${hotelName}`);
		
		if (username && commentInput) {
			const commentText = commentInput.value.trim();
			commentInput.value = ''; 
	
			if (commentText !== '') {
				const hotelRef = firestore.collection('hotels').doc(hotelName);
	
				return firestore.runTransaction(transaction => {
					return transaction.get(hotelRef).then(doc => {
						if (!doc.exists) {
							throw new Error('Hotel document does not exist!');
						}
	
						const updatedComments = [...doc.data().comments, username, commentText];
	
						transaction.update(hotelRef, { comments: updatedComments });
	
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
	
	function renderNewCommentInput(hotelName) {
		return `
			<div class="new-comment">
				<input type="text" id="comment-${hotelName}" placeholder="Skriv en kommentar...">
				<button id="add-comment-button">Legg til kommentar</button>
			</div>
		`;
	}

	/* FILTER */
	function isHotelMatchingFilters(hotel) {
		const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
		let anyChecked = false;
	
		for (let checkbox of filterCheckboxes) {
			if (checkbox.checked && hotel.location === checkbox.id) {
				return true;
			}
			if (checkbox.checked) {
				anyChecked = true;
			}
		}
	
		if (!anyChecked) {
			return true;
		}
	
		return false;
	}

	/* FETCH FIREBASE */
	function fetchImages(hotelNames) {
		return Promise.all(hotelNames.map(hotelName => {
			const imageRef = storage.ref(`hotels/${hotelName}/1.jpeg`);
			return imageRef.getDownloadURL();
		}));
	}

    firestore.collection('hotels').get()
		.then(snapshot => {
			const hotels = [];

			snapshot.forEach(doc => {
				hotels.push(doc.data());
			});

			const hotelNames = hotels.map(hotel => hotel.name);
			return fetchImages(hotelNames)
				.then(images => ({ hotels, images })); 
		})
		.then(({ hotels, images }) => {
			displayHotels(hotels, images); 
			const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
			filterCheckboxes.forEach(checkbox => {
				checkbox.addEventListener('change', () => {
					displayHotels(hotels, images);
				});
			});
		})
		.catch(error => {
			console.error('Error fetching hotels:', error);
		});
	

	const backBtn = document.getElementById('back-btn-menu');
    backBtn.addEventListener('click', backBtnClick);
}

function backBtnClick(event) {
    event.preventDefault(); 
    renderMainMenuForm();
}