const express = require('express');
const route = express.Router();
const usersController = require('../../controllers/users.controller');
const usersValidation = require('../../validations/users.validation');
const authMiddleware = require('../../middlewares/auth.middleware');

route.get('/information',authMiddleware.verifyToken, usersController.getInfo);

route.get('/information/:id',authMiddleware.verifyToken, usersController.getInfo);

route.put(
    '/information/:id',
    authMiddleware.verifyToken,
    usersValidation.updateInfo,
    usersController.updateInfo
);

module.exports = route;
