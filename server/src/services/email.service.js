const nodemailer = require('nodemailer');
const env = require('../utils/environment');
const { OAuth2Client } = require('google-auth-library');

const myOAuth2Client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_SECRET_ID
);

myOAuth2Client.setCredentials({
    refresh_token: env.GOOGLE_REFRESH_TOKEN,
});

const sendEmail = async (data = {}) => {
    try {
        const { to, title, url } = data;
        if ( !to || !title || !url) throw new Error('Missing params');

        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        const myAccessToken = myAccessTokenObject?.token;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                type: 'OAuth2',
                user: env.GOOGLE_ADMIN,
                clientId: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_SECRET_ID,
                refresh_token: env.GOOGLE_REFRESH_TOKEN,
                accessToken: myAccessToken,
            },
        });

        const config = {
            from: env.GOOGLE_ADMIN,
            to: data.to,
            subject: data.title,
            html: url,
        };
        await transporter.sendMail(config);

    } catch (error) {
        throw error
    }
};

module.exports = { sendEmail };
