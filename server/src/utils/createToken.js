const jwt = require('jsonwebtoken');
const env = require('./environment');

const createAccessToken = (data, expireIn = '10s') => {
    return jwt.sign(data, env.ACCESS_TOKEN, { expiresIn: expireIn });
};

const createRefreshToken = (data, expireIn = '15s') => {
    return jwt.sign(data, env.REFRESH_TOKEN, { expiresIn: expireIn });
};

const createForgotToken = (data, expireIn = '5m') => {
    return jwt.sign(data, env.FORGOT_TOKEN, { expiresIn: expireIn });
}

const decodeAccessToken = (data) => {
    return jwt.verify(data, env.ACCESS_TOKEN);
};

const decodeRefreshToken = (data) => {
    return jwt.verify(data, env.REFRESH_TOKEN);
};

const decodeForgotToken = (data) => {
    return jwt.verify(data, env.FORGOT_TOKEN);
};



module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeAccessToken,
    decodeRefreshToken,
    createForgotToken,
    decodeForgotToken
};
