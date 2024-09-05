const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const app = express();

// Route pour gérer le callback OAuth
app.get('/oauth2callback', async (req, res) => {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
        return res.status(400).send('Code d\'autorisation manquant');
    }

    try {
        // Envoyer une requête POST à l'API Google pour échanger le code contre un jeton d'accès
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            code: authorizationCode,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: 'https://maximewohlgemuth.github.io/BoostMyReviews/oauth2callback',
            grant_type: 'authorization_code'
        }));

        // Récupérer le jeton d'accès
        const accessToken = tokenResponse.data.access_token;

        // Stocker le jeton d'accès pour les appels API futurs ou l'envoyer dans une réponse
        res.json({ accessToken });

    } catch (error) {
        console.error('Erreur lors de l\'échange du code d\'autorisation', error);
        res.status(500).send('Erreur lors de l\'échange du code d\'autorisation');
    }
});

app.listen(4000, () => {
    console.log('Serveur démarré sur le port 4000');
});