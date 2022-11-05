const { default: mongoose } = require('mongoose');
const Users = require('../models/users.model');

const getInfo = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await Users.findOne({
                _id: mongoose.Types.ObjectId(id),
            })
                .select({ password: 0, token: 0 })
                .exec();

            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User not exist in out system !',
                });
            }

            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateInfo = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data?.gmail) {
                return resolve({
                    errCode: 1,
                    message: 'You cannot change email !',
                });
            }

            const currentUser = await Users.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(id) },
                { ...data },
                { new: true }
            )
                .select({ password: 0, token: 0 })
                .exec();

            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User is not exist in out system !',
                });
            }

            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { getInfo, updateInfo };
