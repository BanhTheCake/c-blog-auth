const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const {
    createAccessToken,
    decodeAccessToken,
    createRefreshToken,
    decodeRefreshToken,
    createForgotToken,
    decodeForgotToken,
} = require('../utils/createToken');
const email = require('../services/email.service');
const env = require('../utils/environment');
const { v4: uuidv4 } = require('uuid');
const { default: mongoose } = require('mongoose');

const saltRounds = 10;

const handleRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        const { password } = data;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return reject(err);
            }
            try {
                const currentUser = await Users.findOne({ gmail: data.gmail });
                if (currentUser) {
                    return resolve({
                        errCode: 1,
                        message: 'Gmail is exist !',
                    });
                }

                const encodeData = { ...data, password: hash };

                const activatedInTime = '5m';
                const accessToken = createAccessToken(
                    encodeData,
                    activatedInTime
                );

                const url = `${env.CLIENT_URL}/auth/activate/${accessToken}`;

                await email.sendEmail({
                    to: data.gmail,
                    title: 'Click link below to activated your account !',
                    url,
                });

                return resolve({
                    errCode: 0,
                    message: 'Ok'
                });
            } catch (error) {
                reject(error);
            }
        });
    });
};

const handleActivate = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataDecode = decodeAccessToken(token);
            const { password, gmail } = dataDecode;

            if (!password || !gmail) {
                return resolve({
                    errCode: 1,
                    message: 'Jwt is not valid',
                });
            }

            const dataInsert = { password, gmail };
            dataInsert.username = gmail.split('@')[0];
            await Users.create({ ...dataInsert });

            resolve({
                errCode: 0,
                message: 'Ok',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await Users.findOne({ gmail: data.gmail });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'Gmail is not exist in out system !',
                });
            }
            bcrypt.compare(
                data.password,
                currentUser.password,
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!result) {
                        return resolve({
                            errCode: 2,
                            message: 'Gmail or password is wrong !',
                        });
                    }
                    const refreshToken = createRefreshToken(
                        { id: currentUser._id },
                        env.REFRESH_TOKEN_EX
                    );
                    resolve({
                        errCode: 0,
                        data: refreshToken,
                    });
                }
            );
        } catch (error) {
            reject(error);
        }
    });
};

const handleNewToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        try {
            const dataDecode = decodeRefreshToken(refreshToken);
            const newRefreshToken = createRefreshToken(
                { id: dataDecode.id },
                env.REFRESH_TOKEN_EX
            );
            const accessToken = createAccessToken(
                { id: dataDecode.id },
                env.ACCESS_TOKEN_EX
            );

            resolve({
                errCode: 0,
                data: [newRefreshToken, accessToken],
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleForgotPassword = (gmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await Users.findOne({ gmail: gmail });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'Gmail is not exist in out system !',
                });
            }

            const activatedInTime = '5m';
            const forgotToken = createForgotToken(
                { id: currentUser._id },
                activatedInTime
            );
            const url = `${env.CLIENT_URL}/auth/reset-password/${forgotToken}`;

            await email.sendEmail({
                to: currentUser.gmail,
                title: 'Click link below to reset your password !',
                url,
            });

            resolve({
                errCode: 0,
                message: 'Ok',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const verifyForgotToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decodeData = decodeForgotToken(token);
            // Generate userToken for validate when change password
            const userToken = uuidv4();
            await Users.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(decodeData.id) },
                { token: userToken }
            ).exec();

            resolve({
                errCode: 0,
                message: 'Ok',
                data: { id: decodeData.id, userToken: userToken },
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleResetPassword = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const currentUser = await Users.findOne({ _id: mongoose.Types.ObjectId(data.id) })
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User is not exist in out system'
                })
            }
            bcrypt.hash(data.password, saltRounds, async (err, hash) => {
                try {
                    if (err) reject(err)

                    currentUser.password = hash
                    await currentUser.save()

                    resolve({
                        errCode: 0,
                        message: 'Change password complete !'
                    })
                } catch (error) {
                    reject(error)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleRegister,
    handleActivate,
    handleLogin,
    handleNewToken,
    handleForgotPassword,
    verifyForgotToken,
    handleResetPassword
};
