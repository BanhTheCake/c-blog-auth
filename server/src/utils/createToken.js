const jwt = require('jsonwebtoken');
const env = require('./environment');

const createAccessToken = (data, expireIn = '10s') => {
    return jwt.sign(data, env.ACCESS_TOKEN, { expiresIn: expireIn });
};

const createRefreshToken = (data, expireIn = '15s') => {
    return jwt.sign(data, env.REFRESH_TOKEN, { expiresIn: expireIn });
};

const decodeAccessToken = (data) => {
    return jwt.verify(data, env.ACCESS_TOKEN);
};

const decodeRefreshToken = (data) => {
    return jwt.verify(data, env.REFRESH_TOKEN);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeAccessToken,
    decodeRefreshToken,
};
