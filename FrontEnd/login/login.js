function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('.login-container form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        if (!validEmail(emailInput)) {
            console.log('Adresse e-mail invalide');
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

            } else {
                console.error('Erreur lors de la tentative de connexion');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la tentative de connexion:', error);
        });
    });
});
