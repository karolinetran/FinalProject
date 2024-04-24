export async function renderLoginForm() {
    const appDiv = document.getElementById('app');

	fetch('https://api.unsplash.com/photos/random?query=dog&orientation=landscape&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.regular;

			const loginFormHTML = `
			<div class="login-page" style="background-image: url(${imageUrl})">
				<h1 class="login-page-header">
					Hundepass!
				</h1>
				<div class="login-page-info">
					<p>
						Trenger du hundepass, eller leter du etter noen til å 
						passe på hunden dit? Registrer deg for å se mulighetene!
					</p>
				</div>
				<div class="login-container">
					<h2>Logg inn</h2>
					<div class="input-group">
						<label for="username">E-post:</label>
						<input type="text" id="username" placeholder="Skriv inn e-post">
					</div>
					<div class="input-group">
						<label for="password">Password:</label>
						<input type="password" id="password" placeholder="Skriv inn password">
					</div>
					<button class="btn" id="loginBtn">Logg inn</button>
					<a href="#">Glemt passord?</a> 
					<br>
					<a href="#">Ikke medlem enda?</a>
				</div>
			</div>
			`;

			appDiv.innerHTML = loginFormHTML;

			const loginBtn = document.getElementById('loginBtn');
			loginBtn.addEventListener('click', handleLogin);
		})
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

function handleLogin() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === '' && passwordInput === '') {	// lag logg inn her
        alert('Login successful!');
    } else {
        alert('Invalid username or password. Please try again.');
    }
}
