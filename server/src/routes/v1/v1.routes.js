const express = require('express')
const route = express.Router()
const authRoute = require('./auth.route')
const usersRoute = require('./users.route')

route.get('/', (req ,res) => {
    return res.json('halo banhTheCake')
})

route.use('/auth', authRoute)
route.use('/users', usersRoute)


module.exports = route