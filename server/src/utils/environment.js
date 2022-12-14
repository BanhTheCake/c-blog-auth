require('dotenv').config()

const env = {
    PORT: process.env.PORT,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_ADMIN: process.env.GOOGLE_ADMIN,
    GOOGLE_URL_GET_INFO_USER: process.env.GOOGLE_URL_GET_INFO_USER,
    CLIENT_URL: process.env.CLIENT_URL,
    ACCESS_TOKEN_EX: process.env.ACCESS_TOKEN_EX,
    REFRESH_TOKEN_EX: process.env.REFRESH_TOKEN_EX,
    FORGOT_TOKEN: process.env.FORGOT_TOKEN,
    FORGOT_TOKEN_EX: process.env.FORGOT_TOKEN_EX,
}

module.exports = env