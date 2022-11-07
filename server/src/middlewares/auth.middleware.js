const { default: mongoose } = require('mongoose');
const Users = require('../models/users.model');
const { decodeAccessToken } = require('../utils/createToken');

const checkValidUserToken = async (req, res, next) => {
    try {
        const { id, userToken } = req.body;
        if (!userToken) {
            return res.status(401).json({
                errCode: 1,
                message: 'You are not allow to change password !',
            });
        }

        const currentUser = await Users.findOne({
            _id: mongoose.Types.ObjectId(id),
            token: userToken,
        }).exec();

        console.log(currentUser);

        if (!currentUser) {
            return res.status(401).json({
                errCode: 1,
                message: 'You are not allow to change password !',
            });
        }

        currentUser.token = null;
        await currentUser.save();
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const verifyToken = async (req, res, next) => {
    try {
        const formatToken =
            req.headers?.Authorization || req.headers?.authorization;

        if (!formatToken) {
            return res.status(400).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }

        const accessToken = formatToken.split(' ')[1];

        if (!accessToken) {
            return res.status(400).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }
        const decodeData = decodeAccessToken(accessToken);
        req.id = decodeData.id;
        next();
    } catch (error) {
        if (
            error?.message === 'invalid signature'
        ) {
            return res.status(400).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }

        if (error?.message === 'jwt expired') {
            return res.status(400).json({
                errCode: -3,
                message: 'jwt expired',
            });
        }

        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

module.exports = { checkValidUserToken, verifyToken };
