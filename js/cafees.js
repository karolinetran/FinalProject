import firebase from './firebase'; 
import { firestore, storage} from './firebase';
import { renderMainMenuForm } from './mainMenu';

import startImg from '../assets/imgs/star.png'

export function renderCafees() {
    const appDiv = document.getElementById('app');

    const cafeesHTML = `
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
				<div id="cafees-container" class="secondary-options-container"> <!--Container to be filled with filtered results from javascript-->
				</div>
			</div>
		</div>
    `;

    appDiv.innerHTML = cafeesHTML;
	const cafeesContainer = document.getElementById('cafees-container');

	function displaycafees(cafees, images) {
		cafeesContainer.innerHTML = ''; 
	
		cafees.forEach((cafe,index) => {
			if (isCafeMatchingFilters(cafe)) {
				const cafeDiv = document.createElement('div');
				const cafeModal = document.createElement('div');
				cafeDiv.className = 'option-box'; 
				cafeModal.className = "info-modal";
				cafeModal.id = `${cafe.name}`;

				const imageSrc = images[index];
				const averageRating = calculateAverageRating(cafe.rating);
		
				cafeDiv.innerHTML = `
					<a href="#${cafe.name}">
						<img src=${imageSrc} class="option-box-img">
						<div class="option-box-info-container">
							<div class="title-location-container">
								<h2>${cafe.name}</h2>
								<div class="location-with-icon">
									<i class="fa-solid fa-map-location-dot"></i>
									<p class="location">${cafe.location}</p>
								</div>
							</div>
							<div class="rating-container">
								<p>${averageRating}</p>
								<img src=${startImg} class="star-img">
							</div>
							<p>${cafe.infoShort}</p>
						</div>
					</a>
				`;
				cafeModal.innerHTML = `
					<a class="close-modal" href="#"></a>
					<div>
						<div class="modal-content">
							<img src=${imageSrc} class="modal-img">
							<h2>${cafe.name} <span> - ${averageRating} <img src=${startImg} class="star-img"></span></h2>
							<p>${cafe.info}</p>
							<a class="modal-link" href=${cafe.link}>${cafe.link}</a>
							<div>
								${cafe.inneservering ? '<span class="info-tag">Inneservering</span>' : ''}
								${cafe.uteservering ? '<span class="info-tag">Uteservering</span>' : ''}
							</div>
							<div class="rating-container">
								${generateStarImages()}
							</div>
							<div class="comments-container">
								${renderComments(cafe.comments)}
								${renderNewCommentInput(cafe.id)}
							</div>
						</div>
					</div>
				`;
		
				cafeesContainer.appendChild(cafeDiv);
				cafeesContainer.appendChild(cafeModal);

				const addCommentButton = cafeModal.querySelector('#add-comment-button');
				addCommentButton.addEventListener('click', () => {
					addNewComment(cafe.id);
				});

				const starImages = cafeModal.querySelectorAll('.star-img-user');
				const ratingContainer = cafeModal.querySelector('.rating-container');
            	starImages.forEach((star, starIndex) => {
					star.addEventListener('click', () => {
						updateRating(cafe.id, starIndex + 1, ratingContainer); 
					});
				});
			};
		});

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

	async function updateRating(cafeId, rating, ratingContainer) {
		try {
			const user = JSON.parse(localStorage.getItem('user'));
			const userId = user ? user.uid : null;

			if (!userId) {
				console.error('User not logged in!');
				return;
			}
	
			const cafeRef = firestore.collection('cafees').doc(cafeId);
	
			const cafeDoc = await cafeRef.get();
			if (!cafeDoc.exists) {
				console.error('cafe document does not exist!');
				return;
			}
	
			const cafeRating = cafeDoc.data().rating || [];
			cafeRating.push(rating);
	
			await Promise.all([
				cafeRef.update({ rating: cafeRating }),
			]);
	
			console.log('Rating updated successfully for cafe!');
			if (ratingContainer) {
				ratingContainer.innerHTML = 'Thank you for your vote!';
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

	function addNewComment(cafeName) {
		const user = JSON.parse(localStorage.getItem('user'));
		let username = ''; 
		if (user) {
			username = user.displayName || user.email;
		}
		const commentInput = document.getElementById(`comment-${cafeName}`);
		
		if (username && commentInput) {
			const commentText = commentInput.value.trim();
			commentInput.value = ''; 
	
			if (commentText !== '') {
				const cafeRef = firestore.collection('cafees').doc(cafeName);
	
				return firestore.runTransaction(transaction => {
					return transaction.get(cafeRef).then(doc => {
						if (!doc.exists) {
							throw new Error('cafe document does not exist!');
						}
	
						const updatedComments = [...doc.data().comments, username, commentText];
	
						transaction.update(cafeRef, { comments: updatedComments });
	
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
	
	function renderNewCommentInput(cafeName) {
		return `
			<div class="new-comment">
				<input type="text" id='comment-${cafeName}' placeholder="Write a comment...">
				<button id="add-comment-button">Add Comment</button>
			</div>
		`;
	}

	/* FILTER */
	function isCafeMatchingFilters(cafe) {
		const locationCheckboxes = document.querySelectorAll('.filter-checkbox');
		const inneserveringCheckbox = document.getElementById('inneservering');
		const uteserveringCheckbox = document.getElementById('uteservering');
		
		let locationChecked = false;
		let locationMatch = false;
		
		for (let checkbox of locationCheckboxes) {
			if (checkbox.checked) {
				locationChecked = true;
				if (cafe.location === checkbox.id) {
					locationMatch = true;
					break;
				}
			}
		}
		
		
		const inneserveringMatch = !inneserveringCheckbox || !inneserveringCheckbox.checked || cafe.inneservering;
		const uteserveringMatch = !uteserveringCheckbox || !uteserveringCheckbox.checked || cafe.uteservering;
	
		if (!locationChecked) {
			return inneserveringMatch && uteserveringMatch;
		}
	
		return locationMatch && inneserveringMatch && uteserveringMatch;
	}
	

	/* FETCH FIREBASE */
	function fetchImages(cafeNames) {
		return Promise.all(cafeNames.map(cafeName => {
			const imageRef = storage.ref(`cafees/${cafeName}/1.jpeg`);
			return imageRef.getDownloadURL();
		}));
	}

    firestore.collection('cafees').get()
		.then(snapshot => {
			const cafees = [];

			snapshot.forEach(doc => {
				cafees.push(doc.data());
			});

			const cafeNames = cafees.map(cafe => cafe.name);
			return fetchImages(cafeNames)
				.then(images => ({ cafees, images })); 
		})
		.then(({ cafees, images }) => {
			displaycafees(cafees, images); 
			const filterCheckboxes = document.querySelectorAll('.filter-checkbox, .filter-checkbox-inout');
			filterCheckboxes.forEach(checkbox => {
				checkbox.addEventListener('change', () => {
					displaycafees(cafees, images);
				});
			});
		})
		.catch(error => {
			console.error('Error fetching cafees:', error);
		});
	

	const backBtn = document.getElementById('back-btn-menu');
    backBtn.addEventListener('click', backBtnClick);
}

function backBtnClick(event) {
    event.preventDefault(); 
    renderMainMenuForm();
}