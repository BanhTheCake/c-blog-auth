const express = require('express');
const route = express.Router();
const authController = require('../../controllers/auth.controller');
const authValidation = require('../../validations/auth.validation');
const authMiddleware = require('../../middlewares/auth.middleware');

route.post('/register', authValidation.register, authController.register);
route.get('/activate/:token', authController.activateAccount);
route.post('/login', authValidation.login, authController.login);

route.get('/refreshToken', authController.getNewToken);
route.get('/getRefreshToken', authController.getRefreshToken);

route.post(
    '/forgotPassword',
    authValidation.forgotPassword,
    authController.forgotPassword
);
route.get('/forgotPassword/:token', authController.verifyForgotToken);

route.post(
    '/resetPassword',
    authValidation.resetPassword,
    authMiddleware.checkValidUserToken,
    authController.resetPassword
);

route.get('/logout', authController.logout);
route.post('/send-accessToken-google', authController.accessTokenGoogle);

module.exports = route;
