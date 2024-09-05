const axios = require('axios');
const qs = require('querystring');

async function exchangeAuthorizationCode(code) {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: 'https://maximewohlgemuth.github.io/BoostMyReviews/oauth2callback',
            grant_type: 'authorization_code',
        }));

        return response.data.access_token;
    } catch (error) {
        console.error('Erreur lors de l\'échange du code d\'autorisation :', error);
        throw error;
    }
}

module.exports = { exchangeAuthorizationCode };