const express = require('express');
const route = express.Router();
const usersController = require('../../controllers/users.controller');
const usersValidation = require('../../validations/users.validation');
const authMiddleware = require('../../middlewares/auth.middleware');

route.get('/information',authMiddleware.verifyToken, usersController.getInfo);
route.get('/information/:id',authMiddleware.verifyToken, usersController.getInfo);

route.get('/test',authMiddleware.verifyToken, (req, res) => {
    try {
        return res.status(200).json('success')
    } catch (error) {
        return res.status(500).json("Failed")
    }
});

route.put(
    '/information/update/:id',
    authMiddleware.verifyToken,
    usersValidation.updateInfo,
    usersController.updateInfo
);
route.put(
    '/information/update',
    authMiddleware.verifyToken,
    usersValidation.updateInfo,
    usersController.updateInfo
);

module.exports = route;
