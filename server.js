require('dotenv').config();
const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const app = express();
const port = process.env.PORT || 4000;

// Route pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Serveur fonctionne correctement');
});

// Route pour gérer la redirection OAuth2
app.get('/oauth2callback', async (req, res) => {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
        return res.status(400).send('Code d\'autorisation manquant');
    }

    try {
        // Affichage du Client ID et du Client Secret pour vérification
        console.log('Client ID:', process.env.CLIENT_ID);
        console.log('Client Secret:', process.env.CLIENT_SECRET);

        // Envoyer une requête POST à l'API Google pour échanger le code contre un jeton d'accès
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            code: authorizationCode,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code'
        }));

        // Afficher la réponse du jeton d'accès pour vérifier les détails
        console.log(tokenResponse.data);

        // Récupérer le jeton d'accès
        const accessToken = tokenResponse.data.access_token;

        // Faire une requête à l'API Google People pour obtenir l'URL de la photo de profil
        const peopleResponse = await axios.get('https://people.googleapis.com/v1/people/me?personFields=photos', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Afficher les données récupérées de l'API Google People
        console.log(peopleResponse.data);

        // Récupérer l'URL de la photo de profil
        const photoUrl = peopleResponse.data.photos[0].url;
        console.log('Photo URL:', photoUrl);

        // Rediriger vers la page administrateur en incluant l'URL de la photo dans la réponse
        res.redirect(`/admin.html?photoUrl=${encodeURIComponent(photoUrl)}`);
    } catch (error) {
        console.error('Erreur détaillée:', error.response ? error.response.data : error.message);
        res.status(500).send('Erreur lors de l\'authentification');
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});