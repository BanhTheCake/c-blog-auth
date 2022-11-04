const express = require('express')
const route = express.Router()
const authController = require('../../controllers/auth.controller')
const authValidation = require('../../validations/auth.validation')

route.post('/register',authValidation.register, authController.register)
route.get('/activate/:token', authController.activateAccount)
route.post('/login', authValidation.login, authController.login)

route.get('/refreshToken', authController.getNewToken)
route.get('/getRefreshToken', authController.getRefreshToken)

module.exports = route