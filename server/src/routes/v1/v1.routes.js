const express = require('express')
const route = express.Router()
const authRoute = require('./auth.route')
const usersRoute = require('./users.route')


route.use('/auth', authRoute)
route.use('/users', usersRoute)

module.exports = route