function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('.login-container form');
    const emailErrorDiv = document.getElementById('email-error');
    const passwordErrorDiv = document.getElementById('password-error');
    const loginErrorDiv = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        if (!validEmail(emailInput)) {
            console.log('Adresse e-mail invalide');
            emailErrorDiv.innerText = 'Adresse e-mail invalide';
            return;
        }

        if (passwordInput.trim() === "") {
            console.log('Le champ mot de passe est vide');
            passwordErrorDiv.innerText = 'Le champ mot de passe est vide';
            return;
        }

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Connexion réussie');
                
                response.json()
                    .then(data => {
                    const token = data.token;
                    localStorage.setItem('token', token);
                    console.log('Connexion réussie');
                    window.location.href = "/index.html";
                })
            } else if (response.status === 401) { 
                console.error('Mot de passe incorrect');
                loginErrorDiv.innerText = 'Mot de passe incorrect.';
                loginErrorDiv.classList.add('error-message');
            } else if (response.status === 404) { 
                console.error('Adresse e-mail incorrecte');
                loginErrorDiv.innerText = 'Adresse e-mail incorrecte.';
                loginErrorDiv.classList.add('error-message');
            } else {
                console.error('Erreur tentative de connexion');
                loginErrorDiv.innerText = 'Erreur lors de la tentative de connexion. Veuillez réessayer plus tard.';
                loginErrorDiv.classList.add('error-message');
            }
        
        })
        .catch(error => {
            console.error('Erreur tentative de connexion:', error);
        });
    });
});