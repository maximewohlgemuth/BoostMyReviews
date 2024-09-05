const axios = require('axios');

document.addEventListener('DOMContentLoaded', function () {

    // Fonction de connexion
    window.login = function (type) {
        if (type === 'admin') {
            const adminId = document.getElementById('adminId').value;
            const adminPassword = document.getElementById('adminPassword').value;
            if (adminId === 'admin1' && adminPassword === 'pass2') {
                localStorage.setItem('adminLoggedIn', 'true');  // Stocker l'état de connexion de l'admin
                window.location.href = 'admin.html';
            } else {
                alert('Identifiant ou mot de passe incorrect');
            }
        } else if (type === 'employee') {
            const employeeId = document.getElementById('employeeId').value;
            const employeePassword = document.getElementById('employeePassword').value;
            if (employeeId === 'emp1' && employeePassword === 'pass1') {
                if (localStorage.getItem('adminLoggedIn') === 'true') {
                    window.location.href = 'employee.html';  // L'employé peut se connecter si l'admin est connecté
                } else {
                    alert("L'administrateur doit être connecté pour autoriser l'accès.");
                }
            } else {
                alert('Identifiant ou mot de passe incorrect');
            }
        }
    };

    // Fonction pour échanger le code d'autorisation contre un jeton d'accès
    window.exchangeCodeForToken = async function (code) {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                code: code,
                client_id: '715993578538-v98sc1ciih199mrtu6udm1lqehu579cr.apps.googleusercontent.com',  // Remplacez par votre ID client
                client_secret: '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',  // Remplacez par votre secret client
                redirect_uri: 'https://maximewohlgemuth.github.io/BoostMyReviews/oauth2callback',  // URI de redirection
                grant_type: 'authorization_code'
            });

            const accessToken = response.data.access_token;
            console.log('Jeton d\'accès :', accessToken);

            // Vous pouvez maintenant utiliser ce jeton pour effectuer des appels API Google Business Profile
            // Par exemple, vous pouvez stocker le jeton dans le stockage local ou rediriger l'utilisateur
            localStorage.setItem('google_access_token', accessToken);

        } catch (error) {
            console.error('Erreur lors de l\'échange du code d\'autorisation :', error.response ? error.response.data : error.message);
            alert('Erreur lors de la récupération du jeton d\'accès. Veuillez réessayer.');
        }
    };

    // Ajouter un écouteur pour surveiller les changements dans localStorage
    window.addEventListener('storage', function (event) {
        if (event.key === 'adminLoggedOut' && event.newValue === 'true') {
            window.location.href = 'index.html'; // Rediriger l'employé si l'administrateur se déconnecte
        }
    });

    // Placeholder pour d'autres fonctions
});