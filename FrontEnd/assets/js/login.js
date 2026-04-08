function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('.login-container form');
    const loginErrorDiv = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        loginErrorDiv.innerText = "";

        if (!validEmail(emailInput)) {
            loginErrorDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
            loginErrorDiv.classList.add('error-message');
            return;
        }

        if (passwordInput.trim() === "") {
            loginErrorDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
            loginErrorDiv.classList.add('error-message');
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
                    window.location.href = "./index.html";
                });
            } else {
                loginErrorDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
                loginErrorDiv.classList.add('error-message');
            }

        })
        .catch(error => {
            console.error('Erreur tentative de connexion:', error);
        });
    });
});