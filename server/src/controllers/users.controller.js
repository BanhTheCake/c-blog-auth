const usersService = require('../services/users.service')

const getInfo = async (req, res) => {
    try {
        let id = req.id
        if (req.params?.id) {
            id = req.params.id
        }
        const resData = await usersService.getInfo(id)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !'
        })
    }
}

const updateInfo = async (req, res) => {
    try {
        let id = req.id
        if (req.params?.id) {
            id = req.params.id
        }
        const resData = await usersService.updateInfo(id, req.body)
        return res.status(200).json(resData)
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(200).json({
                errCode: -1,
                message: errors,
            });
        }
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !'
        })
    }
}

module.exports = { getInfo, updateInfo }