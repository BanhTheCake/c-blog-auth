const express = require('express')
const route = express.Router()
const authRoute = require('./auth.route')

route.get('/', (req ,res) => {
    return res.json('halo banhTheCake')
})

route.use('/auth', authRoute)


module.exports = route