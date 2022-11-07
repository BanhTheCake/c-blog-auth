const usersService = require('../services/users.service')

const getInfo = async (req, res, next) => {
    try {
        let id = req.id
        if (req.params?.id) {
            id = req.params.id
        }
        const resData = await usersService.getInfo(id)
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

const updateInfo = async (req, res, next) => {
    try {
        let id = req.id
        if (req.params?.id) {
            id = req.params.id
        }
        const resData = await usersService.updateInfo(id, req.body)
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

module.exports = { getInfo, updateInfo }